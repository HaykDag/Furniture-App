const jwt = require("jsonwebtoken");
const createError = require("./error");

const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    
    if (!token) {
        return next(createError(401, "You are not authenticated!"));
    }
    jwt.verify(token, process.env.SECRET, (err, data) => {
        if (err) {
            return next(createError(403, "Token is not valid"));
        }
        req.username = data.username;

        next();
    });
};

module.exports = verifyToken;
