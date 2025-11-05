const express = require('express');
const router = express.Router();
const {Users, User_Role}= require('../models');
const bcrypt = require('bcrypt');

const {createToken, verifyToken} = require('../utils/jwt');
const passport = require('passport');

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

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({error:"Invalid email or password."});
        
        const token = createToken(user);
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24*60*60*1000
        });

        return res.json({message: "Login successful!", user:{
            user_id: user.user_id,
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

module.exports = router;