const express = require('express');
const router = express.Router();
const { Student_Enrollment, Activities, Categories, Honor_List, Faculty_Moderators, Attendance, Users } = require('../models');
const { isAuthenticated, hasRole } = require('../middleware/authMiddleware');
const {FACULTY, ADMIN} = require('../config/roles.js');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_PASSWORD
    },
});


router.post("/enroll", isAuthenticated, async(req,res) => {
    const student_id = Number(req.user.user_id);
    const activities_id = Number(req.body.activities_id);
    const points = 0;

    try {
           const newEnrollment = await Student_Enrollment.create({
        student_id,
        activities_id,
        points,
        approved: null
        });

    const facultyMod = await Faculty_Moderators.findAll({
        where: {
            activity_moderating_id: activities_id
        },
        include: [{
            model: Users,
            attributes: ['email_address']
        }]
    })

    const activity = await Activities.findOne({
        where: {
            activity_id: activities_id
        }
    })

    for (i=0; i<facultyMod.length; i++) {
        console.log(facultyMod[i].User.email_address);
        let facultyEmail=facultyMod[i].User.email_address;

        const mailOptions ={
            from: process.env.GOOGLE_EMAIL,
            to: facultyEmail,
            subject: `New Student Enrollment in ${activity.activity_name}`,
            html: `<h2><span style="color: #ff9900;">Go For Gold!</span></h2>
                    <p>&nbsp;</p>
                    <p>Hey there. You seem to be trying to reset your password.&nbsp;</p>
                    <p>Here's the six-digit token to reset your password:</p>
                    <h1 style="text-align: center;"><span style="color: #3366ff;">${otp}</span></h1>
                    <p>It expires in ten minutes.</p>
                    <p>If this was not you,</p>
                    <p>This email was sent because someone tried resetting your password. Change your password when you log in next in case this was a security issue.</p>
                    <p>&nbsp;</p>
                    <p>Have a good day!</p>
                    <p>GoForGold Support</p>`
        }

        await transporter.sendMail(mailOptions);
        return res.json({message: "OTP sent to email."});
    };

    await newEnrollment.save();
    res.json(newEnrollment);

    } catch (err) {
        console.error(err);
        res.status(500).json({err: "Failed to enroll student"})
    }
 
});

router.delete("/:activities_id/delete", isAuthenticated, async(req,res)=> {
    const student_id=req.user.user_id;
    const {activities_id}=req.params;
try {

    await Attendance.destroy({
        where: {
            student_id,
            activity_id_fk: activities_id
        }
    });
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