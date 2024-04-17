const bcrypt = require("bcrypt")
const User = require("../models/users");
require("dotenv").config()


exports.registerUser = async (requestObject,responseObject)=>{
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

