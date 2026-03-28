const jwt = require('jsonwebtoken');
const { getJwtSecret } = require('../utils/jwt');

module.exports = function (req, res, next) {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7).trim();
    }

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, getJwtSecret());
        req.user = decoded;     // { id, role }
        next();

    } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
};