const express = require('express');
const router = express.Router();
const {Faculty_Moderators, Activities, Student_Enrollment, Users} = require('../models');
const {isAuthenticated, hasRole} = require('../middleware/authMiddleware');
const {FACULTY, ADMIN} = require('../config/roles.js');

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
})

module.exports = router;