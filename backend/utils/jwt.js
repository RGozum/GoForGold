const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

function createToken(user) {
    return jwt.sign(
        {
            user_id: user.user_id,
            email: user.email_address,
            user_role: user.User_Role?.user_role || "Unknown"
        },
        JWT_SECRET, {expiresIn: '1d'}
    );
}

function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    } catch (err) {
        console.error("JWT verification failed", err.message);
        return null;
    }
}

module.exports = {createToken, verifyToken};