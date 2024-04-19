const mongoose = require("mongoose");
const {Schema,model} = mongoose;

const courseSchema = new Schema({
    title:{
        type:String,required:true
    },
    description:{
        type:String,required:true
    },
    category:{
        type:String,required:true
    },
    level:{
        type:String,required:true
    },
    popularity:{
        type:Number,required:true
    },
});

const COURSE = model("Course",courseSchema)

module.exports=COURSE;
