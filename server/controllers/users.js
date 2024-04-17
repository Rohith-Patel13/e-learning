const bcrypt = require("bcrypt")
const User = require("../models/users");
require("dotenv").config()


exports.registerUser = async(requestObject,responseObject)=>{
    console.log(requestObject.body,"In registerUser")
    const {name,email,password,profilePicture} = requestObject.body
    try{
        if(password.length<6){
            return responseObject.send("Password Must Be atleast 6 Characters")
        }
        const encryptedPassoword = await bcrypt.hash(password,Number(process.env.SALT))
        const newRegisteredUser = await User.create({
            name,email,password:encryptedPassoword,profilePicture
        })
        responseObject.status(201).send(newRegisteredUser)

    }catch(error){
        responseObject.status(500).send(error.message)
    }
}


exports.getAllRegisteredUsers = async(requestObject,responseObject)=>{
    console.log("In getAllRegisteredUsers");
    try {
        const getAllRegisterUsers= await User.find()
        responseObject.status(200).send(getAllRegisterUsers)
    } catch (error) {
        responseObject.status(500).send(error.message)
    }
}

exports.updateUserById = async(requestObject,responseObject)=>{
    // console.log(requestObject,"updateUserById")
    const {params} = requestObject
    const {id} = params
    const {body} = requestObject
    try {
        const updatedUser = await User.findByIdAndUpdate(id, body)
        responseObject.status(200).send(updatedUser);
    } catch (error) {
        responseObject.status(500).send(error.message)
    }
}


exports.updateUserDetailsById=async(requestObject,responseObject)=>{
    const {params} = requestObject
    const {id} = params
    const {body} = requestObject
    try {
        const updatedUserDetails = await User.findByIdAndUpdate(id, body)
        responseObject.status(200).send(updatedUserDetails);
    } catch (error) {
        responseObject.status(500).send(error.message)
    }
}