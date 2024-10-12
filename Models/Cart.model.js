const mongoose = require("mongoose")

const cartItemSchema = new mongoose.Schema({
    productID:{type:mongoose.Schema.Types.ObjectId,ref:"product",require:true},
    title:{type:String,require:true},
    price:{type:Number,require:true},
    qty:{type:Number,require:true},
    imgSrc:{type:String,require:true},
})

const cartSchema = new mongoose.Schema({
    userID:{type:mongoose.Schema.Types.ObjectId,ref:"user",require:true},
    items:[cartItemSchema]
})

const CartModel = mongoose.model("cart",cartSchema)
module.exports = CartModel