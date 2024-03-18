const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post('/signup', async(req, res) => {
    // Implement admin signup logic
    const username = req.body.username;
    const password = req.body.password;
    try{
        await Admin.create({
            username,
            password
        })
    
        res.json({
            msg:"Admin has created"
        })
    }
    catch(e){
        console.log(e)

    }
    
});

router.post('/courses', adminMiddleware, async(req, res) => {

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

router.get('/courses', adminMiddleware, async(req, res) => {
   
    // Implement fetching all courses logic
    const respones = await Course.find({})
    
    res.json({
        courses : respones
    })



});

module.exports = router;