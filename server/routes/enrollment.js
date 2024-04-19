const express = require('express');
const router = express.Router();
const enrollmentController = require('../controllers/enrollment');
const middleware = require("../middlewares/auth")


router.post('/enroll',middleware.authenticateJwtToken, enrollmentController.enrollCourse);
router.get('/enrolledCourses/:userId',middleware.authenticateJwtToken, enrollmentController.getEnrolledCourses);

module.exports = router;
