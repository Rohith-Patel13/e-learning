const Enrollment = require('../models/enrollment');
const COURSE = require("../models/courses");
const User = require('../models/users');


const sendEmailId = require("../utils/sendEmail");

// Course Enrollment
exports.enrollCourse = async (requestObject, responseObject) => {
  try {
    const { userId, courseId } = requestObject.body;

    const enrolledCourse = await COURSE.findById(courseId)
    const enrolledUser = await User.findById(userId)

    // Check if the user is already enrolled in the course
    const existingEnrollment = await Enrollment.findOne({ userId, courseId });
    if (existingEnrollment) {
      return responseObject.status(400).send({ error: 'User is already enrolled in this course' });
    }

    // Create new enrollment
    const enrollment = await Enrollment.create({ userId, courseId });

    if(enrollment){
      
      const subject = `Enrolled ${enrolledCourse.title} Course Successfully`
      const text=`Thankyou for enrolling the ${enrolledCourse.title} course, You can now ${enrolledCourse.description}`
      await sendEmailId(enrolledUser.email,subject,text)
    }
    

    responseObject.status(201).send({ message: 'Course enrolled successfully' });
  } catch (error) {
    console.log(error.message);
    responseObject.status(500).send(error.message)
  }
};

// View Enrolled Courses
exports.getEnrolledCourses = async (requestObject, responseObject) => {
  try {
    const { userId } = requestObject.params;

    // Find all enrollments for the user
    const enrollments = await Enrollment.find({ userId }).populate('courseId');

    responseObject.status(200).send(enrollments);
  } catch (error) {
    console.log(error.message);
    responseObject.status(500).send(error.message)
  }
};
