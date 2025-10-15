
const express = require('express');
const router = express.Router();
const { Categories } = require('../models');

router.get("/", async (req, res) => {
    const listOfCategories = await Categories.findAll();
    res.json(listOfCategories);
});

router.post("/", async (req,res) => {
    const post = req.body;
    const newCategory = await Categories.create(post);
    res.json(newCategory);
});

router.put("/:id/archive", async(req,res) => {
    const {category_id} = req.params;
    const category = await Categories.findByPk(id);
    if (!category) return res.status(404).json({message: "Not found"})

    category.active = false;
    await category.save();
    res.json(category);
})


module.exports = router;