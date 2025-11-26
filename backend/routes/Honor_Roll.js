const express = require('express');
const router = express.Router();
const { Honor_Roll } = require('../models');
const {ADMIN} = require ('../config/roles');
const { isAuthenticated, hasRole } = require('../middleware/authMiddleware');

router.get("/", async (req,res) => {
    const listofHonorRoll = await Honor_Roll.findAll();
    res.json(listofHonorRoll);
});

router.post("/", isAuthenticated, hasRole(ADMIN), async (req,res) => {
    const {type,description} = req.body;
    const newHonorRoll = await Honor_Roll.create({
      type,
      description,
    });
    res.json(newHonorRoll);
});

module.exports = router;