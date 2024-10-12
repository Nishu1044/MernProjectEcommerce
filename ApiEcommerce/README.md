# MernProjectEcommerce

# E-commerce api        
User Register/login -->    Product's API                    Cart API                    Shipping Address     
.api/user/register       .api/product/add                 .api/card/add                .api/address/add
.api/user/login          .api/product/all                 .api/card/user               .api/adress/get
.api/user/profile        .api/product/get/:id             .api/card/remove/:id
.api/user/all            .api/product/update/:id          .api/card/--qty/:id
                         .api/product/delete/:id          .api/card/clear

Payment API               Order's API 
.api/payment/checkout     .api/order/confrim
.api/payment/verify       .api/order/confrim/all


<!-- nishukumari3109
HMk6T6M0GTl4dfKZ
mongodb+srv://nishukumari3109:HMk6T6M0GTl4dfKZ@cluster0.njhtz.mongodb.net/ -->

Models --> Controllers --> route ---> server.js 
register --> check user already present or not --> bcrypt(password hashing) ---> Token
login
Product Model --> Product Controller --> Product route --> Product server

# Cart Model --> Cart Controller --> Cart Route --> Cart Server
[addToCart]-->(
    {productID,title,price,qty,imgSrc} = req.body
    findOne({userID})
    If userID not available than add new userID
    If userID available than find the index 
    If itemIndex have been find ----> than increase the quantity and price
    If not find ---- add this {productID,title,price,qty,imgSrc}
)
[GetUserCart]-->(
    const userID = "6707d789912b7652112cf9a2";
    let Cart = await CartModel.findOne({userID}) // CHECK userID
    If not find ---> user not found
    If find ---> show user data
)
[RemoveProductFromCart]-->(
    find productID -->  const ProductId = req.params.productID
    find const userID = "xyz user id here ";
    If not find ---> user not found
    If find ---> apply filter method to cart.items ---> and compare the productID FROM CartModel to ProductID 
    coming from req.body
)
[ClearCart]--->(
    find  const userID = "6707d789912b7652112cf9a2";
    If not found -->  Cart = new CartModel({items:[]}) // make new Cart 
    If found ---> Cart.items = [] // clear empty the array
)
[DecreaseProductQty]--->(
    first copy addtoCart than edit them
    {productID,qty} = req.body
    If userID not available than add new userID
    If userID available than find the index 
    If itemIndex have been find ----> than decrease the quantity and price
    If not find ----   return res.json({message:'invalid product id'})
    save Cart
)

For all above crud we just hard code the userId which is not good -->
so for that we use jsonwebtoken to avoid this in user.js controllers login part



