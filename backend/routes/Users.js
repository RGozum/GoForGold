
const express = require('express');
const router = express.Router();
const { Users } = require('../models');

router.get("/", async (req, res) => {
    const {user_role_id} = req.query;
    
    const where = {};
    if (user_role_id) where.user_role_id=Number(user_role_id);
    
    const listOfUsers = await Users.findAll({where});
    res.json(listOfUsers);
});

router.post("/", async (req,res) => {
    const {first_name,last_name,email_address,password} = req.body;
    const newUser = await Users.create({first_name,last_name,email_address,password});
    res.json(newUser);
});



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

    const createdUsers = await Users.bulkCreate(users);

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



module.exports = router;