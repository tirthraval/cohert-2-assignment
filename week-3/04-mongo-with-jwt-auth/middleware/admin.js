// Middleware for handling auth
const jwt = require('jsonwebtoken');
const { Admin } = require('../db');
const {JWT_SECRET} = require('../utils');
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const token = req.headers.authorization;
    const jwt_token = token.split(' '); // array
    try {
        const decode = jwt.verify(jwt_token[1], JWT_SECRET);
        // console.log(decode)
        if(decode.username){
           next();
        }
        else{
            res.status(403).json({
                message : 'User is not Authorized'
            })
        }
        
    }
    catch(e){
        res.status(403).json({
            message:'Incorecct Inputs'
        })
    }

}

module.exports = adminMiddleware;