const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    try{
        await User.create({
            username,
            password
        })

        res.json({
            message: 'User created successfully'
        })
    }
    catch(e){
        console.log(e);
    }
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const courses = await Course.find({});
    res.json({
        courses
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username
    },{
        $push : {
            purchasedCourses : courseId
        }
    });

    res.json({
        message : "Course Purcashsed"
    })


});

router.get('/purchasedCourses', userMiddleware, async(req, res) => {
    // Implement fetching purchased courses logic
    const username = req.headers.username;
    
    const response = await User.findOne({
        username,
    })
    console.log(response.purchasedCourses)

    const purchasedCourses = await Course.find({
        _id : {
            $in : response.purchasedCourses //return all the saame values for an array
        }
    })

    res.json({
        purchasedCourses
    })

});

module.exports = router