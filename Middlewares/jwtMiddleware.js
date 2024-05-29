
const jwt = require('jsonwebtoken');
const User = require('../model/userModel'); 

const jwtMiddleware = (req, res, next) => {
    console.log("Inside JWT Middleware");
    if(req.headers["authorization"] === undefined){
        return res.status(401).json("Please provide token")
    }
    const token =  req.headers["authorization"].split(" ")[1]
  
    if (token) {
        console.log(token);
        try {
            const jwtResponse = jwt.verify(token,process.env.JWT_SECRET);
           
            req.userId = jwtResponse.userId; 
            next();
        } catch (err) {
         
                console.log('Error in JWT Middleware');
                res.status(401).json("Authentication failed... Please login!!!");
        
            console.log(err);
        }
    } else {
        res.status(406).json(token);
    }
}



module.exports = jwtMiddleware








// const jwt = require('jsonwebtoken')

// const jwtMiidleware = (req,res,next)=>{
//     console.log("Inside JWT Middleware");
//     //get verify token
//     //header key should be small letters(authorization)
//     const token = req.headers["authorization"].split(" ")[1]
//     if(token){
//         console.log(token);
//         //steps verify token
//         try{
//             const jwtResponse = jwt.verify(token,process.env.JWT_SECRET)
//             console.log(jwtResponse);
//             req.payload = jwtResponse.userId
//             next()
//         }catch(err){
//             res.status(401).json("Authentication failed... Please login!!!")
//         }
//     }else{
//         res.status(406).json("Please provide token")
//     }
// }

// module.exports = jwtMiidleware