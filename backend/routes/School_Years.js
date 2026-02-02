const express = require('express');
const router = express.Router();
const {School_Years} = require('../models');
const {ADMIN} = require ('../config/roles');
const { isAuthenticated, hasRole } = require('../middleware/authMiddleware');

router.get("/", async(req,res)=> {
    const listOfYears= await School_Years.findAll();
    res.json(listOfYears);
});

module.exports = router;