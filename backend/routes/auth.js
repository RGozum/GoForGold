const express = require('express');
const router = express.Router();
const {Users, User_Role}= require('../models');
const bcrypt = require('bcrypt');

const {createToken, verifyToken} = require('../utils/jwt');
const passport = require('passport');
const {isAuthenticated} = require ('../middleware/authMiddleware');

const nodemailer = require('nodemailer');

router.post('/login', async (req,res,next) => {
    const {email_address,password} = req.body;
    try {        
        const user = await Users.findOne({
            where: {email_address},
            include: [{model:User_Role}],
        });
        

        if (!user) {
            return res.status(401).json({error: "User does not exist."});
        }

        if (!user.active) {
            return res.status(404).json({error: "User's account is not active."});
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({error:"Invalid email or password."});
        
        const token = createToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24*60*60*1000
        });

        console.log("User_Role at login:", user.User_Role);

        return res.json({message: "Login successful!", user:{
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email_address: user.email_address,
            user_role: user.User_Role?.user_role,
            
        },
    });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error during login'});
    }
});

router.get('/check', (req,res)=> {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({authenticated: false});
    };

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(403).json({authenticated: false});
    };

    res.json({
        authenticated: true,
        user: decoded
    });
});

router.post('/logout', (req,res) => {
    res.clearCookie('token');
    res.json({message: "Logged out."});
})

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile','email']
    })
);

router.get('/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/auth/login/failed',
        session: false
    }), (req,res) => {
        try {
            const token = createToken(req.user);
            res.cookie("token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                maxAge: 24*60*60*1000
            });

            const role = req.user.User_Role?.user_role;
            console.log(role);
            if (role === "Administrator") return res.redirect('http://localhost:5173/adminpanel');
            if (role === "Faculty") return res.redirect("http://localhost:5173/facultypanel");
            return res.redirect("http://localhost:5173/studentdashboard");
    
        } catch (err) {
            console.error(err);
            res.redirect("http://localhost:5173/login");
        }
    }
);

router.get('/login/failed', (req,res) => res.status(401).json({message: "Failed to authenticate"}));

router.post('/generatetoken', async (req,res)=> {
    const {email_address}=req.body;

    try {        
        const user = await Users.findOne({
            where: {email_address}});

        if (!user) {
            return res.status(401).json({error: "User does not exist."});
        }

        if (!user.active) {
            return res.status(404).json({error: "User's account is not active."});
        }

        if (user.token && user.token_created_at) {
            const now = new Date();
            const diffSeconds = (now - user.token_created_at)/1000;
            if (diffSeconds <60){
                const remaining=Math.ceil(60-diffSeconds);
                return res.status(429).json({message: `Please wait ${remaining} seconds before requesting a new OTP.`, seconds_left:remaining});
            }
        }
        const otp = Math.floor(100000+ Math.random() * 900000).toString();
        const hashedOtp = await bcrypt.hash(otp, 10);
        user.token=hashedOtp;
        user.token_created_at= new Date();
        await user.save();


        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_PASSWORD
            },
        });
        
        const mailOptions ={
            from: process.env.GOOGLE_EMAIL,
            to: email_address,
            subject: "Go For Gold - Password Reset",
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
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error during email'});
    }  
});

router.post('/resetpassword', async(req,res)=> {
    const {email_address, newpassword} = req.body;
    let {token}=req.body;
    token=String(token).trim();
    try {
        const user = await Users.findOne({
            where: {email_address}
        });

        if (!user) {
            return res.status(401).json({error: "User does not exist."});
        }

        if (!user.active) {
            return res.status(404).json({error: "User's account is not active."});
        }

        if (user.token && user.token_created_at) {
            const now = new Date();
            const diffMinutes = (now - user.token_created_at)/1000/60;
            if (diffMinutes >10){
                return res.status(400).json({message: "Your token expired. Request a new token for your attempt."});
            }
        }

        const match = await bcrypt.compare(token, user.token);
        if (!match) return res.status(401).json({error:"Incorrect token."});

        const hashedPassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedPassword;

        user.token=null;
        user.token_created_at=null;

        await user.save();
        return res.json({message:"Password reset successfully."})

    } catch(err){
        console.error(err);
        res.status(500).json({message: "Server error while updating password"})
    }


});

router.post("/verifypassword", isAuthenticated, async(req, res) => {
    const {currentPassword} = req.body;

    const user_id = req.user.user_id;

    const user = await Users.findByPk(user_id);

    if (!user) {
    return res.status(404).json({ error: "User not found" });
    }


    const match = await bcrypt.compare(currentPassword, user.password);
    if (!match) return res.status(401).json({error:"Invalid email or password."});

    res.json({message: "Password is correct!"});

});

router.post("/changepassword", isAuthenticated, async(req, res) => {
    
    const {newPassword} = req.body;
    const user_id = req.user.user_id;

    try {
    const user =  await Users.findByPk(user_id);

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await user.save();
    return res.json({message: "Password updated successfully."});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: "Server failed while updating password."})
    }
});


module.exports = router;