const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const { isAuthenticated, hasRole } = require('../middleware/authMiddleware');
const { Users, User_Role } = require('../models');

router.get('/profile',isAuthenticated, (req,res)=> {
  res.json({user:req.user});
})

router.get("/", isAuthenticated, has async (req, res) => {
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

// router.post("/", async (req,res) => {
//     const {first_name,last_name,email_address,user_role_id, defaultPassword} = req.body;
//     if (!defaultPassword) defaultPassword = "Vianney!";
//     password = await bcrypt.hash(defaultPassword, 10);

//     const newUser = await Users.create({first_name,last_name,email_address,password, user_role_id});
//     res.json(newUser);
// });


router.post("/bulk", async(req,res) => {
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
  
})



router.put("/:user_id/archive", async (req, res) => {
  const { user_id } = req.params;
  const user = await Users.findByPk(user_id);
  if (!user) return res.status(404).json({ message: "Not found" });
  user.active = !user.active; 
  await user.save();
  res.json(user);

});

// router.post("/login", async (req,res) => {
//   const {email_address, password } = req.body;

//   const user = await Users.findOne({where: {email_address:email_address}});

//   if (!user) return res.json({err: "No account associated with email"});
//   bcrypt.compare(password, user.password).then((match)  => {
//     if (!match) return res.json({error: "Incorrect password."});
    
    
//     return res.json(accessToken);
//   });
// });

module.exports = router;