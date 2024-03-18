// Middleware for handling auth
const { Admin } = require( "../db");
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const username = req.headers.username;
    const password = req.headers.password;
    console.log(req.header)
    try{
        const respones = await Admin.findOne({
            username,
            password
        })
        if(respones){
            next();
        }
        else{
           
            res.status(403).json({
                msg : "You are not admin"
            }) 
        }
    }
    catch(e){
        console.log(e)
    }

}

module.exports = adminMiddleware;