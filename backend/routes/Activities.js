const express = require('express');
const router = express.Router();
const { Activities} = require('../models');
const {ADMIN} = require ('../config/roles');
const { isAuthenticated, hasRole } = require('../middleware/authMiddleware');

router.get("/", async(req, res) => {
  try {
    const {category_id} = req.query;

    console.log(category_id);

    const where = {};
    if (category_id) where.category_id=Number(category_id);
    console.log(where);

    const listOfActivities = await Activities.findAll({where});
    res.json(listOfActivities);
  } catch (err) {
    console.error(err);
    res.status(500).json({err: "Failed to retrieve activities."});
  }
    
});

router.get("/:category_id/active", async(req,res) => {
  const {category_id}=req.params;
  try {
    const activeActivities = await Activities.findAll({
      where: {category_id, active: true},
      order: [['activity_name','ASC']]
    });
    res.json(activeActivities);
  }catch (err){ 
    console.error(err);
    res.status(500).json({err: "Failed to retreieve active activities."});
  }
  
})

router.post("/",  isAuthenticated, hasRole(ADMIN), async (req,res) => {
    const {activity_name,category_id} = req.body;
    const newActivity = await Activities.create({
      activity_name,
      category_id,
    });
    res.json(newActivity);
});

router.put("/:activity_id/archive", isAuthenticated, hasRole(ADMIN), async (req, res) => {
  const { activity_id } = req.params;
  const activity = await Activities.findByPk(activity_id);
  if (!activity) return res.status(404).json({ message: "Not found" });
  activity.active = !activity.active; 
  await activity.save();
  res.json(activity);

});

module.exports = router;