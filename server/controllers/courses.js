const COURSE = require('../models/courses');


// SORTING, FILTERING, PAGINATION
exports.getAllCourses=async(requestObject,responseObject)=>{
  console.log(requestObject.query);
  try {
    const excludedFields = ["sort","limit","fields","page"]
    const queryObj = {...requestObject.query}
    excludedFields.forEach((el)=>{
      delete queryObj[el]
    })

    // filtering data
    let query = COURSE.find(queryObj)

    // sorting data (use "minus symbol" if you want in descending order)
    if (requestObject.query.sort) {
      const sortBy = requestObject.query.sort.split(",").join(" ");
      console.log(sortBy, "sortBy");
      query = query.sort(sortBy); // sort() is a mongoose sorting query method
    }else{
      query = query.sort("-createdAt") // by default sort 
    }

    // Pagination
    const page = Number(requestObject.query.page) || 1
    const limit = Number(requestObject.query.limit) || 10
    const skip = (page-1)*limit
    query = query.skip(skip).limit(limit)

    if(requestObject.query.page){
      const coursesCount = await COURSE.countDocuments()
      if(skip>=coursesCount){
        return responseObject.status(400).send("This page is not found")
      }
    }

    const courseData = await query;
    
    // let courseData = await COURSE.find(requestObject.query) // when we pass query strings which those fields doesnot present in course object then it will not work.

    responseObject.status(200).send(courseData)
  } catch (error) {
    console.log(error.message);
    responseObject.status(500).send({ errorMessage: "Server error" });
  }
}



// SUPER ADMIN CRUD OPERATIONS
exports.createCourse=async(requestObject,responseObject)=>{
  // console.log(requestObject.body)
  try {
    const createdCourse = await COURSE.create(requestObject.body)
    // console.log(createdCourse)
    responseObject.status(201).send(createdCourse)
  } catch (error) {
    console.log(error.message);
    responseObject.status(500).send({ errorMessage: "Server error" });    
  }
}

exports.getCourseById = async (requestObject, responseObject) => {
  try {
      const courseId = requestObject.params.id;
      const course = await COURSE.findById(courseId);
      if (!course) {
          responseObject.status(404).send({ errorMessage: "Course not found" });
      } else {
          responseObject.status(200).send(course);
      }
  } catch (error) {
      console.log(error.message);
      responseObject.status(500).send({ errorMessage: "Server error" });
  }
};

exports.updateCourse = async (requestObject, responseObject) => {
  try {
      const courseId = requestObject.params.id;
      const updates = requestObject.body;
      const updatedCourse = await COURSE.findByIdAndUpdate(courseId, updates);
      if (!updatedCourse) {
          responseObject.status(404).send({ errorMessage: "Course not found" });
      } else {
          responseObject.status(200).send(updatedCourse);
      }
  } catch (error) {
      console.log(error.message);
      responseObject.status(500).send({ errorMessage: "Server error" });
  }
};



exports.deleteCourse = async (requestObject, responseObject) => {
  try {
      const courseId = requestObject.params.id;
      const deletedCourse = await COURSE.findByIdAndDelete(courseId);
      if (!deletedCourse) {
          responseObject.status(404).send({ errorMessage: "Course not found" });
      } else {
          responseObject.status(200).send({ message: "Course deleted successfully" });
      }
  } catch (error) {
      console.log(error.message);
      responseObject.status(500).send({ errorMessage: "Server error" });
  }
};
