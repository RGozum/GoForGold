const express = require('express');
const router = express.Router();
const { Student_Enrollment, Activities, Categories, Honor_List } = require('../models');
const { isAuthenticated, hasRole } = require('../middleware/authMiddleware');
const {FACULTY, ADMIN} = require('../config/roles.js')

router.post("/enroll", isAuthenticated, async(req,res) => {
    const student_id = req.user.user_id;
    const {activities_id} = req.body;
    const points = 0;

    const newEnrollment = await Student_Enrollment.create({
        student_id,
        activities_id,
        points,
});

await newEnrollment.save();
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

router.get("/points", isAuthenticated, async(req,res)=> {
    try {
        const student_id = req.user.user_id;
        const points = await Student_Enrollment.sum("points", {
            where: {
                approved: true,
                student_id
            },
        });

        const honorPoints= await Honor_List.sum("points", {
            where: {
                student_id
            },
        })
        const totalPoints=points+honorPoints;
        res.json({points: totalPoints || 0});
    } catch (err) {
        console.error(err);
        res.status(500).json({err: "Failed to get points"});
    }
})

router.put("/:student_id/:activities_id/approve", isAuthenticated, hasRole(ADMIN, FACULTY), async(req,res)=>{
    try {
        const {student_id, activities_id}=req.params;
        const {approved} = req.body;
        const student_enrolled = await Student_Enrollment.findOne({
            where: {
                student_id, activities_id
            },
        });

        if (!student_enrolled) return res.status(404).json({message:"Not found"});

        student_enrolled.approved = approved;
        await student_enrolled.save();

        res.json({message: `Student ${approved ? "approved" : "denied"} successfully`})

    } catch (err) {
        console.error(err);
        res.status(500).json({err: "Failed to update student"});
    }
})

router.put("/:student_id/:activities_id/editpoints", isAuthenticated, hasRole(ADMIN, FACULTY), async(req,res)=> {
    try {
        const {student_id, activities_id} = req.params;
        const {point}=req.body;
        const student_enrolled = await Student_Enrollment.findOne({
            where: {
                student_id, activities_id
            },
        });

        if (!student_enrolled) return res.status(404).json({message:"Not found"});

        student_enrolled.points=point;
        await student_enrolled.save();

        res.json({message: "Points edited."});

    } catch(err) {
        console.error(err);
        res.status(500).json({err: "Failed to edit points"})
    }
})

module.exports = router;