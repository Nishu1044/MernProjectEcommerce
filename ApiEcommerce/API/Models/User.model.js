const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    role: {
        type: String,
        enum: ['Admin', 'Customer', 'Member'], // Define roles
        default: 'Customer'
    },
    createdAt:{type:Date,default:Date.now}
})
const userModel = mongoose.model("user",userSchema)
module.exports = userModel
