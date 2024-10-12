const express = require("express")
const {addToCART,userCart, RemoveProductFromCart, ClearCart, DecreaseProductQty} = require("../Controllers/cart")
const CartRouter = express.Router()
const Authenticated = require("../Middlewares/auth.js")


// add to cart
CartRouter.post("/add", Authenticated, addToCART)

// get user cart
CartRouter.get("/user",Authenticated, userCart)

// Remove product from cart
CartRouter.delete("/remove/:productID",Authenticated,RemoveProductFromCart)

// Clear cart
CartRouter.delete("/clear",Authenticated,ClearCart)

// decrease items qty
CartRouter.post("/--qty",Authenticated,DecreaseProductQty)
module.exports = CartRouter