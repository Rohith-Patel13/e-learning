const express = require("express");
const router = express.Router()

const UsersController = require("../controllers/users")

// register
router.post("/register",UsersController.registerUser);

// Get all registered users
router.get("/getAllRegisteredUsers",UsersController.getAllRegisteredUsers);

// update user by id
router.put("/updateUserById/:id",UsersController.updateUserById)

// login
// router.post("/login",UsersController.registerUser);

module.exports = router;
