const checkAdmin = (req, res, next) => {
    // Assuming `req.user.role` is set after authentication
    if (req.user && req.user.role === 'Admin') {
      next(); // Proceed if user is Admin
    } else {
      res.status(403).send('You are not authorized to access this route'); // Deny access for non-admins
    }
  };
  
  module.exports = checkAdmin;
  







// const checkAdmin = (req,res,next)=>{
//     if(req.body.role === 'Admin'){
//       next()
//     }else{
//       res.send(`You are not authorized to access this route`)
//     }
//   }
  
  
//   module.exports = checkAdmin;