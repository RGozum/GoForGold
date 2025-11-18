const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();

const {Op} = require('sequelize');

const {ADMIN} = require ('../config/roles');
const { isAuthenticated, hasRole } = require('../middleware/authMiddleware');
const { Users, User_Role } = require('../models');

router.get("/profile",isAuthenticated, (req,res)=> {
  res.json({user:req.user});
});

router.get("/search", isAuthenticated, hasRole(ADMIN), async(req, res)=> {
  let {last_name, first_name} = req.query;

  last_name = last_name?.trim() || "";
  first_name = first_name?.trim() || "";

  try {
    const whereClause= {};

    if (last_name) {
      whereClause.last_name = {
        [Op.like]: `%${last_name}%`
      };
    }

    if (first_name) {
      whereClause.first_name = {
        [Op.like]: `%${first_name}%`
      };
    }

    const listOfUsers = await Users.findAll({
      where: whereClause,
      include: [User_Role],
      order: [['last_name', 'ASC'], ['first_name', 'ASC']]
    });

    if (listOfUsers.length >0) {
      return res.status(200).json(listOfUsers);
    } else {
      return res.status(404).json({message: "No users found"});
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({message: "Server error."});
  }
});


router.get("/", isAuthenticated, hasRole(ADMIN), async (req, res) => {
    const {user_role_id} = req.query;
    
    const where = {};
    if (user_role_id) where.user_role_id=Number(user_role_id);
    
        try {
        const listOfUsers = await Users.findAll({
            where,
            include: [User_Role], 
            order: [['last_name', 'ASC'], ['first_name', 'ASC']]
        });
        res.json(listOfUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

router.post("/bulk",isAuthenticated, hasRole(ADMIN), async(req,res) => {
  try {
    const {users} = req.body;

    if (!Array.isArray(users) || users.length ===0) {
      return res.status(400).json({message: "No users provided."});
    }

    for (const u of users) {
      if (!u.first_name || !u.last_name || !u.email_address || !u.user_role_id) {
        return res.status(400).json({message: "Each user must include first name, last name, email, and role."});
      }
    }

    const defaultPassword= "Vianney!";
    const hashedPassword = await bcrypt.hash(defaultPassword, 10);

    const usersWithPassword = users.map((u) => ({
      ...u, password: hashedPassword,
    }));

    const createdUsers = await Users.bulkCreate(usersWithPassword);

    res.status(201).json({
      message: `${createdUsers.length} users created successfully!`,
      users: createdUsers,
    });
  } catch (err) {
    console.error("Error creating users:", err);
    res.status(500).json({message: "Internal server error."});
  }
  
});

router.put("/:user_id/archive", isAuthenticated, hasRole(ADMIN), async (req, res) => {
  const { user_id } = req.params;
  const user = await Users.findByPk(user_id);
  if (!user) return res.status(404).json({ message: "Not found" });
  if (user.user_id ===1 && req.user?.user_id!==1) return res.status(401).json({message: "You cannot update this account."});
  user.active = !user.active; 
  await user.save();
  res.json(user);

});

router.put("/:user_id/permissions", isAuthenticated, hasRole(ADMIN), async(req, res) => {
  const {user_role_id} = req.body;
  const {user_id} = req.params;

  const user = await Users.findByPk(user_id, {
    include: [User_Role],
    attributes: {
      exclude: ['password']
    }
  });

  if (!user) return res.status(404).json({message: "User not found."});

  if (user.user_id ===1 && req.user?.user_id!==1) return res.status(401).json({message: "You cannot update this account."});

  user.user_role_id=user_role_id;
  await user.save();
  res.json(user);

});

router.get("/:user_id", isAuthenticated, hasRole(ADMIN), async(req,res)=> {
  const {user_id} = req.params;

  const user = await Users.findByPk(user_id, {
    include: [User_Role],
    attributes: {
      exclude: ['password']
    }
  });
  if (!user) return res.status(404).json({ message: "Not found" });
  res.json(user);
});

module.exports = router;