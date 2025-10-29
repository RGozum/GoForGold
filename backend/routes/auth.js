const express = require('express');
const passport = require('passport');
const router = express.Router();
const {Users, User_Role}= require('../models');
const bcrypt = require('bcrypt');

router.post('/login', async (req,res,next) => {
    const {email_address,password} = req.body;
    try {        
        const user = await Users.findOne({
            where: {email_address},
            include: User_Role,
        });

        if (!user) {
            return res.status(401).json({error: "User does not exist."});
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(401).json({error:"Invalid email or password."});

        req.login(user, (err)=> {
            if (err) return next(err);
            return res.json({
                message: 'Login successful', user});
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server error during login'});
    }
});

router.post('/logout', (req,res) =>
    req.session.destroy(err => {
        if (err) return res.status(500).json({error: "Failed to logout."});
        res.clearCookie('connect.sid');
        res.json({message: "Logged out."})
    })
)

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile','email']
    })
);

router.get('/google/callback', 
    passport.authenticate('google', {
        failureRedirect: '/auth/login/failed'
    }),
    (req, res) => {
        req.session.user_id=req.user.user_id;

        if (req.headers.accept && req.headers.accept.includes('text/html')) {
            return res.redirect('/protected');
        }
        return res.json({message: "Google login successful", user:req.user});
    }
);

router.get('/login/failed', (req,res) => res.status(401).json({message: "Failed to authenticate"}));

module.exports = router;