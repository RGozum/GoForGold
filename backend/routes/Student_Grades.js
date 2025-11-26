const express = require('express');
const router = express.Router();
const { Student_Grades } = require('../models');

router.get("/", async (req,res) => {
    const listofGrades = await Student_Grades.findAll();
    res.json(listofGrades);
});

module.exports = router;