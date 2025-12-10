const express = require('express');
const router = express.Router();
const {Faculty_Moderators, Activities, Student_Enrollment, Users} = require('../models');
const {isAuthenticated, hasRole} = require('../middleware/authMiddleware');
const {FACULTY, ADMIN} = require('../config/roles.js');

router.get("/:user_id", isAuthenticated, hasRole(FACULTY, ADMIN), async (req,res)=> {
    try {
        const user_id=Number(req.params.user_id);

        const where = {faculty_id: user_id};
        const moderating = await Faculty_Moderators.findAll({
            where,
            include: [
                {model: Activities
                }
            ]
        });
        res.json(moderating);
    } catch (err) {
        console.error(err);
        res.status(500).json({err: "Failed to retrieve activities."})
    }
})

router.get("/activities", isAuthenticated, hasRole(FACULTY, ADMIN), async(req,res)=> {
    try {
        const faculty_id=req.user.user_id;

        const where = {faculty_id: Number(faculty_id)};
        const moderatingActivities = await Faculty_Moderators.findAll({
            where, 
            include: [
                {
                    model: Activities,
                    include: [{
                        model: Student_Enrollment,
                        include: [{
                            model: Users,
                            attributes: ['first_name', 'last_name'],
                        }]
                    },],
                },
            ],
        });
        res.json(moderatingActivities);
    } catch (err) {
        console.error(err);
        res.status(500).json({err: "Failed to retrieve activities"});
    }
});

router.post("/add-moderators", isAuthenticated, hasRole(ADMIN), async(req,res)=> {
    const {activity_moderating_id, faculty_id}=req.body;

    try {
        const newModerator = await Faculty_Moderators.create({
            activity_moderating_id,
            faculty_id
        })
        res.json(newModerator);
    } catch (err) {
        console.error(err);
        res.status(500).json({err: "Failed to add moderator to activity."})
    }
});

router.delete("/:faculty_id/:activity_moderating_id/delete-mod", isAuthenticated, hasRole(ADMIN),async(req,res)=> {
    const {faculty_id, activity_moderating_id}=req.params;
    try {
        await Faculty_Moderators.destroy({
            where: { faculty_id, activity_moderating_id },
        });
        return res.status(200).json({ message: "Moderator deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({err: "Failed to delete moderator from activity"});
    }
})

module.exports = router;