const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, User, Course } = require("../db");
const router = Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../utils");
// Admin Routes
router.post('/signup', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;

    Admin.create({
        username,
        password
    }).then(() => res.json({
        message : 'User has been created'
    })).catch(e =>{
        console.log(e);
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    Admin.findOne({
        username,
        password
    }).then(value =>{
        if(value){
            //create the jwt and move forwad
            const token = jwt.sign({username} , JWT_SECRET);
            res.json({
                token 
            })
        }
        else{
            //user not found
            res.status(404).json({
                message:'user not found'
            })
        }
    }).catch(e => {
        res.status(403).json({
            message : "Wrong Input"
        })
    })
  

});

router.post('/courses', adminMiddleware, async (req, res) => {
    // Implement course creation logic
    const title = req.body.title;
    const desc = req.body.desc;
    const price = req.body.price;
    const imageLink = req.body.imageLink;

    try{
        await Course.create({
            title:title,
            description:desc,
            price:parseInt(price),
            imageLink:imageLink

        })
    }
    catch (e){
        res.status.apply(403).json({
            msg :e
        })
    }

    res.json({
        message: 'Courses created successfully'
    })

});

router.get('/courses', adminMiddleware, (req, res) => {
    // Implement fetching all courses logic
    Course.find({}).then(value =>{
        res.json({
            Courses : value
        })
    }).catch(e =>{
        console.log(e)
    })
});

module.exports = router;