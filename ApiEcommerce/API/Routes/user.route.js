const express = require("express")
const { register, login, UsersData, Profile } = require("../Controllers/user")
const router = express.Router()
const Authenticated = require("../Middlewares/auth.js")

// register user
router.post("/register",register)

// login user
router.post("/login",login)

// get all users
router.get("/all",UsersData)

//  get user Profile
router.get("/profile",Authenticated,Profile)

module.exports = router