const {verifyToken} = require('../utils/jwt');

function isAuthenticated(req,res,next)  {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({error: "Unauthorized"});

    const decoded = verifyToken(token);
    if (!decoded) return res.status(403).json({error: "Invalid token"});

    req.user=decoded;
    next();
}

function hasRole(...allowedRoles) {
    return (req,res,next) => {
        if (!req.user) return res.status(401).json({error: "Unauthorized"});

        const userRole = req.user.user_role;

        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({
                message: `Forbidden: Requires one of [${allowedRoles.join(", ")}]`
        });
    }  
        next()
    };
}

module.exports = {isAuthenticated,hasRole};