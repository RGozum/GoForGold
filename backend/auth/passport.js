const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {Users, User_Role} = require('../models');

module.exports = (passport) => {
passport.serializeUser((user, done) => done(null, user.user_id));
passport.deserializeUser(async (user_id, done) => {
    try {
        const user = await Users.findByPk(user_id, {include:User_Role});
        done (null, user);
    } catch (err) {
        done(err)
    }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
    try {

        const email = profile.emails[0].value;
        const google_id=profile.id;

        let user = await Users.findOne({
            where: {google_id}});
        console.log("Google ID from profile:", profile.id);

        if (!user) {
            user = await Users.findOne({ where: { email_address: email } });
            if (user) {
                user.google_id = profile.id;
                await user.save();
            } else {
                return done(null, false, {message: "No account associated with this Google email."});
            }
        }
        return done(null, user);
    } catch (err) {
        return done(err, null);
    }
}));
}