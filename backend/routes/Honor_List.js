const express = require('express');
const router = express.Router();
const { Honor_List } = require('../models');
const {ADMIN} = require ('../config/roles');
const { isAuthenticated, hasRole } = require('../middleware/authMiddleware');

router.get("/", async (req,res) => {
    const listOfHonor = await Honor_List.findAll();
    res.json(listOfHonor);
});

router.post("/", isAuthenticated, hasRole(ADMIN), async (req,res) => {
    const {student_id, honor_roll_id, quarter,grade} = req.body;
    const points =5;
    const newHonorListMember = await Honor_List.create({
      student_id, honor_roll_id, quarter, grade, points
    });
    res.json(newHonorListMember);
});

router.post("/bulk", async (req,res)=> {
  try {
    const {honorList} = req.body;
    if (!Array.isArray(honorList) || honorList.length === 0) {
      return res.status(400).json({message: "No honor roll provided."});
    }

    for (const h of honorList) {
      if (!h.honor_roll_id || !h.student_id || !h.quarter || !h.grade) {
        return res.status(400).json({message: "Each list of honor roll students must include the honor roll, the student, the quarter, and the grade year."})
      }
    }

    const defaultPoints=5;
    const honorListwithPoints = honorList.map((h)=> ({
      ...h, points: defaultPoints,
    }));

    const createdHonorList = await Honor_List.bulkCreate(honorListwithPoints);

    res.status(201).json({
      message: `${createdHonorList.length} added to the honor roll`,
      honorList: createdHonorList,
    });
  } catch (err) {
    console.error("Error adding users to honor roll:", err);
    res.status(500).json({message: "Internal server error."});
  }
})

module.exports = router;
