const express = require("express");
const router = express.Router()

const UsersController = require("../controllers/users")

// register
router.post("/register",UsersController.registerUser);

// Get all registered users
router.get("/getAllRegisteredUsers",UsersController.getAllRegisteredUsers);

// update user by id
router.put("/updateUserById/:id",UsersController.updateUserById)

// update some details of user by id
router.patch("/updateUserDetailsById/:id",UsersController.updateUserDetailsById)

// login
router.post("/login",UsersController.loginUser);

// forgot password
router.post("/fogot-password",UsersController.forgotPassword)


// reset-password
router.get("/reset-password/:id/:token",UsersController.resetPassword)

// resetPasswordSend 
router.post("/reset-password/:id/:token",UsersController.resetPasswordSend)


module.exports = router;
