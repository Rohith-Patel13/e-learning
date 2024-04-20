const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const User = require("../models/users");
const sendEmailId = require("../utils/sendEmail");
require("dotenv").config()



exports.registerUser = async(requestObject,responseObject)=>{
    console.log(requestObject.body,"In registerUser")
    const {name,email,password,profilePicture,role} = requestObject.body
    try{
        if(password.length<6){
            return responseObject.send("Password Must Be atleast 6 Characters")
        }
        const encryptedPassoword = await bcrypt.hash(password,Number(process.env.SALT))
        const newRegisteredUser = await User.create({
            name,email,password:encryptedPassoword,profilePicture,role
        })
        if(newRegisteredUser){
            const subject = "Registration Confirmed for E-learning"
            const text="Thankyou for registering E-learning platform"
            await sendEmailId(email,subject,text)
        }
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

exports.loginUser=async(requestObject,responseObject)=>{
    console.log(requestObject.body,"login")
    const {email,password} = requestObject.body
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            const comparePassword = await bcrypt.compare(password, existingUser.password);
            if (!comparePassword) {
                responseObject.status(400);
                responseObject.send("Invalid password");
            }else{
                const payload = {
                    name: existingUser.name,
                    user_id: existingUser._id,
                    email:existingUser.email,
                    password:existingUser.password,
                    profilePicture:existingUser.profilePicture,
                    role:existingUser.role
                };
                const jwtCreatedToken = await jwt.sign(payload, process.env.SECRET_STRING);
                responseObject.send({
                    jwtToken: jwtCreatedToken,
                });
            }
        }
    } catch (error) {
        responseObject.status(500).send(error.message)
    }
}
