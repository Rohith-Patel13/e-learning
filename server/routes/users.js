const express = require("express");
const router = express.Router()

const UsersController = require("../controllers/users")

// create
router.post("/register",UsersController.registerUser);

module.exports = router;
