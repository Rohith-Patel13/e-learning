const express = require("express");
const app = express();
const mongoose = require("mongoose")
const UserRoutes = require("./routes/users")
const CoursesRoutes = require("./routes/courses")
const enrollmentRoutes = require('./routes/enrollment');

app.use(express.json());

require("dotenv").config()

app.listen(9090,()=>{
    console.log("Sever Started at Given Port Number")
    mongoose.connect(process.env.MONGODB_URI)
            .then(()=>(
                console.log("Database Connected")
            ))
            .catch((error)=>(
                console.log(error.message)
            ))
});

app.use("/api/users",UserRoutes);
app.use("/api/courses",CoursesRoutes);
app.use("/api/enrollment", enrollmentRoutes);
