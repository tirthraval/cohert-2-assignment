const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Admin, Course, User } = require("../db");
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../utils");

// User Routes
router.post('/signup', (req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.create({
        username,
        password
    }).then((value) => {
        res.json({
            message : 'User has been created'
        })
    }).catch(e =>{
        res.status(403).json({
            error : e
        })
    })
});

router.post('/signin', (req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    User.findOne({
        username,
        password
    }).then(value => {
        if(value){
            //found the user
            const token = jwt.sign({username}, JWT_SECRET);
            res.json({
                token
            })
        }
        else{
            res.status(403).json({
                message : 'Wrong Id and Password'
            })
        }
    })
    .catch(e =>res.status(403).json(
        {
            message:'Wrong Input'
        }
    ))
});

router.get('/courses', (req, res) => {
    // Implement listing all courses logic
    Course.find({}).then(value =>{
        res.json({
            value
        })
    })

});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
    // Implement course purchase logic
    const username = req.username;
    const courseId = req.params.courseId;
    User.updateOne({
        username
    },{
        $push :{
            purchasedCourses:courseId
        }
    }).then(
        res.json({
            msg : 'Purchased Course Succesfully'
        })
    )

});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
    // Implement fetching purchased courses logic
    const username = req.username;
    User.findOne({
        username
    }).then(value => {
        Course.find({
           _id : {
                $in : value.purchasedCourses
           } 
        }).then(data => {
           if(data){
            res.json({
                Courses : data
            })
           }
        })
    })
});

module.exports = router