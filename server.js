const express = require("express");
const Connection = require("./Config/db");
require("dotenv").config();

const userRouter = require("./Routes/user.route");
const Productrouter = require("./Routes/product.route");
const CartRouter = require("./Routes/cart.route");
const AddressRouter = require("./Routes/address");


const app = express()
const PORT = process.env.PORT || 1000

// HOME testing routes
app.get("/",(req,res)=>res.json({msg:"this is home route"}))


app.use(express.json())
app.use("/api/user",userRouter)
app.use("/api/product",Productrouter)
app.use("/api/card",CartRouter)
app.use("/api/address",AddressRouter)

app.listen(PORT,()=>{
    Connection()
console.log(`server is running on PORT ${PORT}`);

})




