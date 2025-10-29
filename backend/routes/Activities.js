const express = require('express');
const router = express.Router();
const { Activities, Categories } = require('../models');

router.get("/", async(req, res) => {
    const {category_id} = req.query;

    const where = {};
    if (category_id) where.category_id=Number(category_id);

    const listOfActivities = await Activities.findAll({where});
    res.json(listOfActivities);
});

router.post("/", async (req,res) => {
    const {activity_name,category_id} = req.body;
    const newActivity = await Activities.create({
      activity_name,
      category_id,
    });
    res.json(newActivity);
});

router.put("/:activity_id/archive", async (req, res) => {
  const { activity_id } = req.params;
  const activity = await Activities.findByPk(activity_id);
  if (!activity) return res.status(404).json({ message: "Not found" });
  activity.active = !activity.active; 
  await activity.save();
  res.json(activity);

});

module.exports = router;