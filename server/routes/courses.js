const express = require("express");
const router = express.Router()

const middleware = require("../middlewares/auth")
const CoursesControllers=require("../controllers/courses")


router.get("/getAllCourses",CoursesControllers.getAllCourses);

router.post("/adminCreateCourse",
middleware.authenticateJwtToken,middleware.verifyAdminOrNot("superadmin"),
CoursesControllers.createCourse)


module.exports=router
