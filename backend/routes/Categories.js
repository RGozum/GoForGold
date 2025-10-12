
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


module.exports = router;