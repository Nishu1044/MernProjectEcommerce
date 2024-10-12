const jwt = require("jsonwebtoken")
 userModel = require("../Models/User.model")


const Authenticated = async(req,res,next)=>{
  const token = req.header("Auth")

  if(!token) return res.json({message:"Login first"})

    // if token find
    const decoded = jwt.verify(token,process.env.JWT__SECRET)
    // console.log(decoded);
    const id = decoded.NewuserId

    // if user present
    let user =  await userModel.findById(id)


    // if user is not there or deleted
    if(!user) return res.json({message:"User not Exist"})

    //  user present than save it
    req.user = user
    next();
    
} 

module.exports = Authenticated