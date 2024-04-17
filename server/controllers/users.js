const bcrypt = require("bcrypt")
const User = require("../models/users");
require("dotenv").config()



exports.registerUser = async (requestObject,responseObject)=>{
    console.log(requestObject.body,"In registerUser")
    const {name,email,password} = requestObject.body
    try{
        const encryptedPassoword = await bcrypt.hash(password,Number(process.env.SALT))
        const newRegisteredUser = await User.create({
            name,email,password:encryptedPassoword
        })
        responseObject.send(newRegisteredUser)
    }catch(error){
        responseObject.status(500).send(error.message)
    }
}
