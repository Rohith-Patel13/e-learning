// importing mongoose library which is  MongoDB ODM for Node.js
const {model,Schema} = require("mongoose")

const emailRegex=  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const userSchema = new Schema({
    name:{type:String,required:[true,"name must not be empty"]},
    email: {
        type:String,
        unique:true,
        required:[true,"email must not be empty"],
        validate:{
            validator:(email)=>emailRegex.test(email),
            message:(props)=>`${props.value} is not a valid email`
        }
    },
    password:{type:String,required:[true,"password must not be empty"]},
    profilePicture: { type: String,required:[true,"profile picture must not be empty"] } 
},{timestamps:true})

// creating a model
const User = model("User",userSchema);

module.exports = User;

