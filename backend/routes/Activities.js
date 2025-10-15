const express = require('express');
const router = express.Router();
const { Activities } = require('../models');

router.get("/", async(req, res) => {
    const listOfAcivities = await Activities.findAll();
    res.json(listOfAcivities);
});

router.post("/", async (req,rest) => {
    const post = req.body;
    const newActivity = await Activities.create(post);
    res.json(newActivity);
});

router.put("/:id/archive", async(req,res) => {
    const {activity_id} = req.params;
    const activity = await Activities.findByPk(activity_id);
    if (!activity) return res.status(404).json({message: "Not found"})

    category.active = false;
    await category.save();
    res.json(category);
})


module.exports = router;