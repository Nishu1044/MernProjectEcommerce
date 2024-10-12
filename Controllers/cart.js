const CartModel = require("../Models/Cart.model")


//  add to cart
const addToCART = async(req,res)=>{
    const{productID,title,price,qty,imgSrc} = req.body
    // const userId = "6707d789912b7652112cf9a2"
    //  const userID = "6707d789912b7652112cf9a2"  not need to hard code

    const userID = req.user

    let Cart = await CartModel.findOne({userID})
    if(!Cart){
        Cart = new CartModel({userID,items:[]}) // add new userID
    }
    
    // if userID available than find the index 
    const itemIndex = Cart.items.findIndex((item)=>item.productID.toString()===productID) // (last productId) which is coming from req.body
     
    // if itemIndex have been find ----> than increase the quantity and price
    if(itemIndex > -1){
     Cart.items[itemIndex].qty += qty; //qty comes from req.body
     Cart.items[itemIndex].price += price*qty; // price comes from req.body
    }
    else{
        Cart.items.push({productID,title,price,qty,imgSrc})
    }
      await Cart.save()
      res.json({message:'item added to cart',Cart})
}

// get user cart
const userCart = async(req,res)=>{
    const userID = req.user
    try {
        let Cart = await CartModel.findOne({userID})
        if(!Cart) return res.json({message:"Cart not found"})

        // cart have been find
        res.json({message:"user cart",Cart})

    } catch (error) {
        res.json({message:"error occur while find cart",error})
        console.log(error);  
    }
}


// Remove product from cart
const RemoveProductFromCart = async(req,res)=>{
    const ProductId = req.params.productID
    const userID = req.user
    try {
        let Cart = await CartModel.findOne({userID})
        if(!Cart) return res.json({message:"Cart not found"})

        // cart have been find
        Cart.items = Cart.items.filter((itemData)=>itemData.productID.toString() !== ProductId)
        await Cart.save();
        res.json({message:"Product remove from cart"})

    } catch (error) {
        res.json({message:"error occur while removing product from cart",error})
        console.log(error);  
    }
}


// Clear cart
const ClearCart = async(req,res)=>{
    const userID = req.user
    try {
        let Cart = await CartModel.findOne({userID})
        if(!Cart){
         Cart = new CartModel({items:[]})
        }
        else{
         Cart.items = []
        }
        await Cart.save();
        res.json({message:"Cart cleared"})

    } catch (error) {
        res.json({message:"error occur while clearing cart",error})
        console.log(error);  
    }
}


// decrease Quantity from cart
const DecreaseProductQty = async(req,res)=>{
    const {productID,qty} = req.body
    const userID = req.user
    try {
        let Cart = await CartModel.findOne({userID})
        if(!Cart){
            Cart = new CartModel({userID,items:[]})
        }
 
        // if find userID---> find index
        const itemIndex = Cart.items.findIndex(
            (item) => item.productID.toString() === productID
        )
        // If matched
        if(itemIndex > -1){
            const item = Cart.items[itemIndex]
            if(item.qty > qty){
                const PricePerUnit = item.price/item.qty

                item.qty -= qty
                item.price -= PricePerUnit*qty
            }
            else{
                Cart.items.splice(itemIndex,1)
            }
        }
        else{ // if itemIndex NOT FOUND
           return res.json({message:'invalid product id'})
        }
        await Cart.save();
        res.json({message:"items qty decrease",Cart})
    
    } catch (error) {
        
    }
}


module.exports = {addToCART,userCart,RemoveProductFromCart,ClearCart,DecreaseProductQty}