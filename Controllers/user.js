const userModel = require("../Models/User.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


// user register
const register = async(req,res)=>{
    const{name,email,password,role} = req.body
    try {
        
        let user = await userModel.findOne({email})
        if(user) return res.json({message:"user Already exist"})

        // hashed password
        const hashedPass = await bcrypt.hash(password,5)
        
        let newUser = new userModel({name,email,password:hashedPass})
        await newUser.save()
        res.status(201).json({message:"newUser created sucessfully",newUser,success:true})
    } catch (error) {
        res.status(401).json({messgae:"error occurs while creating user",error})
        console.log(error);
    }
}


// user login
const login = async(req,res)=>{
    const{email,password} = req.body
    try {
        let findUser = await userModel.findOne({email})
        if(!findUser){
           return res.json({message:"User not Found...please register first",success:false})
        }

        // if user present than check password match
        const isValidPass = await bcrypt.compare(password, findUser.password)
        if(!isValidPass) return res.json({message:"Invalid Credential"})


        // to generate Token from jwt
        const token = jwt.sign({ NewuserId: findUser._id}, process.env.JWT__SECRET, { expiresIn: "365d" });

        //if match 
        res.json({message:`Welcome ${findUser.name}`,token, success:true}) 

    } catch (error) {
        res.json({message:error.message})
        console.log(error);
        
    }
}

// Get all users
const UsersData = async(req,res)=>{
    try {
        let users = await userModel.find().sort({createdAt:-1})
        res.json(users)
    } catch (error) {
        res.json(error.message)
    }
}

//  get Profile
const Profile = async(req,res)=>{
    res.json({user:req.user})
} 

module.exports = {register,login,UsersData,Profile}
