const express = require("express");
const router = express.Router()

const middleware = require("../middlewares/auth")
const CoursesControllers=require("../controllers/courses")


router.get("/getAllCourses",CoursesControllers.getAllCourses);



// create a course
router.post("/adminCreateCourse",
middleware.authenticateJwtToken,middleware.verifyAdminOrNot("superadmin"),
CoursesControllers.createCourse)

// delete a course
router.delete("/adminDeleteCourse/:id",
middleware.authenticateJwtToken,middleware.verifyAdminOrNot("superadmin"),
CoursesControllers.deleteCourse)


module.exports=router
