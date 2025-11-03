function isAuthenticated(req,res,next)  {
    if (req.isAuthenticated()) return next();
    return res.status(401).json({error: "Unauthorized"});
}

function hasRole(role) {
    return (req,res,next) => {
        if (!req.isAuthenticated()) {
            return res.staus(401).json({error: "Please log in."})
        }
        
        const userRole = req.user?.User_Role?.user_role;
        if (userRole === role) {
            return next();
        }
        res.status(403).json({message: "Forbidden: Incorrect role."})
    };
}

module.exports = {isAuthenticated,hasRole};