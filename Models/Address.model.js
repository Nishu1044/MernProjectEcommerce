const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    },
    fullName:{type:String,require:true},
    address:{type:String,require:true},
    city:{type:String,require:true},
    state:{type:String,require:true},
    country:{type:String,require:true},
    pincode:{type:Number,require:true},
    phoneNumber:{type:Number,require:true},
    createdAt:{type:Date,default:Date.now}
})

const AddressModel = mongoose.model("address",addressSchema)
module.exports = AddressModel