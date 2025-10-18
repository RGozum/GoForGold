
const express = require('express');
const router = express.Router();
const { Users } = require('../models');

router.get("/", async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
});

router.post("/", async (req,res) => {
    const {first_name,last_name,email_address,password} = req.body;
    const newUser = await Users.create({first_name,last_name,email_address,password});
    res.json(newUser);
});

router.put("/:user_id/archive", async (req, res) => {
  const { user_id } = req.params;
  const user = await Users.findByPk(user_id);
  if (!user) return res.status(404).json({ message: "Not found" });
  user.active = !user.active; 
  await user.save();
  res.json(user);

});



module.exports = router;