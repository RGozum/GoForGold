const express = require('express');
const router = express.Router();
const { Categories } = require('../models');

const {ADMIN} = require ('../config/roles');
const { isAuthenticated, hasRole } = require('../middleware/authMiddleware');

router.get("/", async (req, res) => {
    const listOfCategories = await Categories.findAll();
    res.json(listOfCategories);
});

router.post("/", isAuthenticated, hasRole(ADMIN), async (req,res) => {
    const {category_name} = req.body;
    const newCategory = await Categories.create({category_name});
    res.json(newCategory);
});

router.put("/:category_id/archive", isAuthenticated, hasRole(ADMIN), async (req, res) => {
  const { category_id } = req.params;
  const category = await Categories.findByPk(category_id);
  if (!category) return res.status(404).json({ message: "Not found" });
  category.active = !category.active; 
  await category.save();
  res.json(category);

});



module.exports = router;