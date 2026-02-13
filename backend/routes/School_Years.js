const express = require('express');
const router = express.Router();
const {School_Years} = require('../models');
const {ADMIN} = require ('../config/roles');
const { isAuthenticated, hasRole } = require('../middleware/authMiddleware');

router.get("/", isAuthenticated, async(req,res)=> {
    const listOfYears= await School_Years.findAll();
    res.json(listOfYears);
});

router.get("/:year_id", isAuthenticated, hasRole(ADMIN), async(req,res)=> {
    const year_id = req.params;
    const year = await School_Years.findOne({
        where: year_id
    })
    res.json(year);
});

router.put("/:year_id/editdates", isAuthenticated, hasRole(ADMIN), async(req,res) => {
    const { year_id } = req.params;
    const {start_date, end_date} = req.body;
    const year = await School_Years.findOne(
        {where: {
            year_id}
        });
    if (!year) return res.status(404).json("Year not found");
    year.start_date = start_date;
    year.end_date = end_date;
    await year.save();
    res.json(year);
});

router.put("/:year_id/archive", isAuthenticated, hasRole(ADMIN), async(req,res)=> {
    const { year_id } = req.params;
    try {
        const activeYear = await School_Years.findOne(
            {where: {
                year_id, 
                active: 1,
            },
        });
        if (activeYear) {
            activeYear.active = !activeYear.active;
            await activeYear.save(); 
        }
        res.json(activeYear);
    } catch (err) {
        console.error("Error updating year: "+ err);
        res.status(500).json({err: "Failed to update year"});
    } 
});

router.put("/:year_id/active", isAuthenticated, hasRole(ADMIN), async(req,res)=> {
    const { year_id } = req.params;
    try {
        const activeYear = await School_Years.findOne({where: {active: true}});
        if (activeYear) {
            activeYear.active = !activeYear.active;
            await activeYear.save();
        }
        const year = await School_Years.findOne({where: {year_id}});
        if (!year) return res.status(404).json("Year not found");
        year.active = !year.active;
        await year.save();
        res.json(year);
    } catch (err) {
        console.error("Error updating year: "+ err);
        res.status(500).json({err: "Failed to update year"});
    };
})

router.post("/newyear", isAuthenticated, hasRole(ADMIN), async(req,res) => {
    try {
        const {name, start_date, end_date} = req.body;
        const newYear = await School_Years.create({name, start_date, end_date,end_date, active: true});

        const activeYear = await School_Years.findOne({where: {active: true}});
        if (activeYear) {
            activeYear.active = !activeYear.active;
            await activeYear.save();
        }

        res.json(newYear);
    } catch(err) {
        console.error(err);
        res.status(500).json({err: "Failed to create year"});
    }
})

module.exports = router;