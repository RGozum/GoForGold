const express = require('express');
const router = express.Router();
const { User_Role } = require('../models');
console.log(User_Role);

router.get("/", async (req,res) => {
    const listOfRoles = await User_Role.findAll();
    res.json(listOfRoles);
});

module.exports = router;