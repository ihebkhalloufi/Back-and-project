const jwt = require("jsonwebtoken");
require("dotenv").config({path: './Config/.env'})

module.exports = {
        verifyToken: (req,res,next) => {
              let  token  = req.headers.authorization;
              token = token.split(" ")[1];
         if (token) {
        jwt.verify(token,process.env.SECRET_KEY,(err,decoded) => {
               if (err) {
                      res.status(200).json({status: true, message:"YOUR TOKEN WAS EXPIRED PLEASE LOGIN !!!"})
               }else if (decoded) { next()
               }
        });
              

         }
       }
}