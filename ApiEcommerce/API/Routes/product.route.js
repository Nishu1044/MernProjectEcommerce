const express = require("express")
const { addProduct, getProduct, findProductById, updateProductById, deleteProductById } = require("../Controllers/product")
// const checkAdmin = require("../Middlewares/checkAdmin.js")
const checkAdmin = require("../Middlewares/checkAdmin.js");
const Authenticated = require("../Middlewares/auth.js"); // Authentication middleware import karein



const Productrouter = express.Router()


// // addProduct 
// Productrouter.post("/add",addProduct)

// // getProduct
Productrouter.get("/all",getProduct)

// // get product BY Id
Productrouter.get("/:id",findProductById)
Productrouter.post("/add", Authenticated, checkAdmin, addProduct);
Productrouter.put("/:id", Authenticated, checkAdmin, updateProductById);
Productrouter.delete("/:id", Authenticated, checkAdmin, deleteProductById);

// // update product by Id
// Productrouter.put("/:id",updateProductById)

// // delete product by Id
// Productrouter.delete("/:id",deleteProductById)



module.exports = Productrouter