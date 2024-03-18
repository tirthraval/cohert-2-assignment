const { User } = require("../db");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
    try {
        const response = await User.findOne({
            username,
            password
        })
        if(response){
            next();
        }
        else{
            res.status(404).json({
                msg : "User not found"
            })
        }

    }
    catch(e){
        res.status(403).json({
            msg : "something went wrong"
        })
    }


}

module.exports = userMiddleware;