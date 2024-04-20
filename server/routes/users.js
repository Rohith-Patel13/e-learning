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

module.exports = router;
