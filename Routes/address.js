const express = require("express")
const {addAddress,getAddress} = require("../Controllers/address")
const AddressRouter = express.Router()
const Authenticated = require("../Middlewares/auth.js")

//  add address
AddressRouter.post("/add",Authenticated,addAddress)

// get address
AddressRouter.get("/get",Authenticated,getAddress)


module.exports = AddressRouter