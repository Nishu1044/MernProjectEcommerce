const ProductModel = require("../Models/Product.model")


const addProduct = async(req,res)=>{
    const{title,description,price,category,qty,imgSrc} = req.body
    try {

        const addNewProduct = new ProductModel({title,description,price,category,qty,imgSrc})
        await addNewProduct.save()
        res.status(201).json({message:"products added successfully",success:true,addNewProduct})
        
    } catch (error) {
        res.status(201).json({message:"something wrong while adding products",success:false,error})
    }
}


// get products
const getProduct = async(req,res)=>{
    try {
        const getDataProduct = await ProductModel.find().sort({createdAt:-1})
        res.json({message:"All Products",getDataProduct})
        console.log(getDataProduct);
           
    } catch (error) {
        res.json(error.message)
        console.log(error);
        
}
}


// find product by id
const findProductById = async(req,res)=>{
    const id = req.params.id
    try {
        const findProdById = await ProductModel.findById(id)
        if(!findProdById) return res.json({message:"Invalid Id"})
        res.json({message:"Specific Product",findProdById})
        console.log(findProdById);
           
    } catch (error) {
         // Return error message and log the error
         res.status(500).json({ message: error.message });
         console.log(error);
    }
}

// update product by id
const updateProductById = async(req,res)=>{
    const id = req.params.id
    try {
        const updateProdById = await ProductModel.findByIdAndUpdate(id,req.body,{new:true})
        if(!updateProdById) return res.json({message:"Invalid Id"})
        res.json({message:"Specific Product",updateProdById})
        console.log(updateProdById);
           
    } catch (error) {
         // Return error message and log the error
         res.status(500).json({ message: error.message });
         console.log(error);
    }
}


// delete product by id
const deleteProductById = async(req,res)=>{
    const id = req.params.id
    try {
        const deleteProdById = await ProductModel.findByIdAndDelete(id)
        if(!deleteProdById) return res.json({message:"Invalid Id"})
        res.json({message:"Product deleted"})
           
    } catch (error) {
         res.status(500).json({ message: error.message });
         console.log(error);
    }
}
module.exports = {addProduct,getProduct,findProductById,updateProductById,deleteProductById}