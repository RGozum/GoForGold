const express = require('express');
const router = express.Router();
const { Student_Enrollment, Activities, Categories } = require('../models');
const { isAuthenticated } = require('../middleware/authMiddleware');

router.post("/enroll", isAuthenticated, async(req,res) => {
    const student_id = req.user.user_id;
    const {activities_id} = req.body;
    const points = null;

    const newEnrollment = await Student_Enrollment.create({
        student_id,
        activities_id,
        points,
    });
    res.json(newEnrollment);
});

router.delete("/:activities_id/delete", isAuthenticated, async(req,res)=> {
    const student_id=req.user.user_id;
    const {activities_id}=req.params;
try {
    await Student_Enrollment.destroy({
      where: { activities_id, student_id },
    });
    return res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete activity" });
  }
});

router.get("/enrolledactivities", isAuthenticated, async(req,res)=> {
    try {
    const student_id = req.user.user_id;

    const where = {student_id: Number(student_id)};
    const listOfActivities = await Student_Enrollment.findAll({
        where,
        include: [
            { 
                model: Activities,
                include: [{
                    model: Categories,
                    attributes: ['category_name'],
                },
            ],
            },
        ],
    });
    res.json(listOfActivities);
} catch (err) {
    console.error(err);
    res.status(500).json({err: "Failed to retrieve activities"});
}
});

module.exports = router;