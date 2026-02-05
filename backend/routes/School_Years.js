const express = require('express');
const router = express.Router();
const {School_Years} = require('../models');
const {ADMIN} = require ('../config/roles');
const { isAuthenticated, hasRole } = require('../middleware/authMiddleware');

router.get("/", async(req,res)=> {
    const listOfYears= await School_Years.findAll();
    res.json(listOfYears);
});

router.get("/:year_id", async(req,res)=> {
    const year_id = req.params;
    const year = await School_Years.findOne({
        where: year_id
    })
    res.json(year);
});

router.put("/:year_id/editdates", async(req,res) => {
    const year_id = req.params;
    const {start_date, end_date} = req.body;
    const year = await School_Years.findOne({where: year_id});
    if (!year) return res.status(404).json("Year not found");
    year.start_date = start_date;
    year.end_date = end_date;
    await year.save();
    res.json(year);
})

module.exports = router;