const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils');
function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    const tokens = req.headers.authorization;
    const words = tokens.split(' ');
    const JWT_TOKEN = words[1];
    const decode = jwt.verify(JWT_TOKEN, JWT_SECRET);
    if(decode.username){
        req.username = decode.username;
        next();
    }
    else{
        res.status(404).json({
            message:'You are not authorized'
        })
    }

}

module.exports = userMiddleware;