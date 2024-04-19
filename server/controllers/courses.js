const COURSE = require('../models/courses');


exports.getAllCourses = async (requestObject, responseObject) => {
  try {
    const { category, level } = requestObject.query;
    const query = {};
    if (category) query.category = category;
    if (level) query.level = level;
    const courses = await COURSE.find(query);
    responseObject.send(courses);
  } catch (error) {
    console.log(error.message);
    responseObject.status(500).send({ errorMessage: "Server error" });
  }
};





exports.getCoursesWithPagination = async (requestObject, responseObject) => {
  try {
    const { category, level, page = 1, limit = 10 } = requestObject.query;
    const query = {};
    if (category) query.category = category;
    if (level) query.level = level;
    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
    };
    const courses = await COURSE.paginate(query, options);
    responseObject.send(courses);
  } catch (error) {
    console.log(error.message);
    responseObject.status(500).send({ errorMessage: "Server error" });
  }
};


// SUPER ADMIN CRUD OPERATIONS
exports.createCourse=async(requestObject,responseObject)=>{
  try {
    const createdCourse = COURSE.create(requestObject.body)
    responseObject.status(201).send(createdCourse)
  } catch (error) {
    console.log(error.message);
    responseObject.status(500).send({ errorMessage: "Server error" });    
  }
}