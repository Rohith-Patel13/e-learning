const express = require("express");
const app = express();
const mongoose = require("mongoose")

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

