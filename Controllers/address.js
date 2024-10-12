const AddressModel = require("../Models/Address.model")

const addAddress = async(req,res)=>{
   let {fullName,address,city,state,country,pincode,phoneNumber} = req.body
   let userID = req.user
    try {
        let userAddress = new AddressModel({userID,fullName,address,city,state,country,pincode,phoneNumber})
          await userAddress.save()
          res.json({message:"Address added"})
    } catch (error) {
        res.json({message:"error while addind address",error})
        console.log(error);
        
    }
}


const getAddress = async(req,res)=>{
    try {
        let address = await AddressModel.find({userID:req.user}).sort({createAt:-1})
        res.json({messsage:"address",userAddress:address[0]})
    } catch (error) {
        res.json({message:"error occurs while getting address"})
    }
}
module.exports = {addAddress,getAddress}