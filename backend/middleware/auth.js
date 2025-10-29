module.exports = (req,res,next) => {
    if (req.session.user_id) return next();
    return res.status(401).json({error: "Unauthorized"});
};