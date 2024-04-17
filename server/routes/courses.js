const express = require("express");
const router = express.Router()

const CoursesControllers=require("../controllers/courses")

router.get("/getAllCourses",CoursesControllers.getAllCourses)

module.exports=router
