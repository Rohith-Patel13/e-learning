const COURSE = require('../models/courses');





exports.getAllCourses=async(requestObject,responseObject)=>{
  console.log(requestObject.query);
  try {
    

    const excludedFields = ["sort","limit","fields","page"]

    const queryObj = {...requestObject.query}

    excludedFields.forEach((el)=>{
      delete queryObj[el]
    })

    // filtering data
    let courseData = await COURSE.find(queryObj)


    // sorting data
    if (requestObject.query.sort) {
      const sortBy = requestObject.query.sort;
      console.log(sortBy, "sortBy");
      // Create a comparison function based on sortBy
      const compareFunction = (a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      };
      // Sorting data using the comparison function
      courseData = courseData.sort(compareFunction);
    }
    
    
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
