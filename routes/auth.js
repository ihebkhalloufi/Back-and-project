const router = require("express").Router();
const User = require("../Model/User");
const Admin = require("../Model/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({path: './Config/.env'})
const { verifyToken } = require("../Middlewares/auth")
/*REGISTER */
router.post("/User/Register", async(req, res) => {
    try {
        console.log(req.body)
        const {Username, Email,Age,Password} = req.body
        const usedemail = await User.findOne({Email})
        const usedusername = await User.findOne({Username})
     if (usedemail) {
            res.status(200).json({status: false, message:"EMAIL ALREADY EXIST"})
        } else
        if (usedusername) {
            res.status(200).json({status: false, message:"USERNAME ALREADY EXIST"})
        } else {
            bcrypt.hash(Password,12,async(err,hash) =>{
            if (err){
                res.status(200).json({status: true,message:err});
            } else if (hash) {
           const users = await User.create({Username, Email,Age, Password:hash})
            res.status(200).json({status: true, message:"USER REGISETER", data: users})
            }
            });
        }
    } catch(error) {
        res.status(200).json({status: true, message: error ,message: "SOMETHING WRONG !!!"})
    }
})
//Login
router.get("/User/Login", async (req, res) => {
    try {
        const{Email,Password} = req.body;
        let user = await User.findOne({Email})      
        if (user) {
            bcrypt.compare(Password,user.Password,async (err,result) => {
               if (err) {
                     res.status(200).json({status: true ,message:" EMAIL OR PASSWORD ERROR",});
                }else if (result) {
                   const token = jwt.sign({Username:user.Username,Email:user.Email,Age:user.Age},process.env.SECRET_KEY)
                   res.status("200").json({status: true,message:"YOU ARE CONNECTED !!!",date:token})
                } 
            });
        } else{
         res.status("200").json({status: false,message:"INVILED USER"})
        }    
    } catch(err) {
        res.status(200).json({status: false, message: err ,message:"SOMETHING WRONG !!!"})
    }
})
//ADMIN PART
/*REGISTER */
router.post("/Register/Admin",verifyToken, async(req, res) => {
    try {
        const {Username, Email,Age,Password} = req.body
        console.log(req.body)
        const usedemail = await Admin.findOne({Email})
        const usedusername = await Admin.findOne({Username})
     if (usedemail) {
            res.status(200).json({status: false, message:"ADMIN ALREADY EXIST"})
        } else
        if (usedusername) {
            res.status(200).json({status: false, message:"ADMIN ALREADY EXIST"})
        } else {
            bcrypt.hash(Password,12,async(err,hash) =>{
            if (err){
                res.status(200).json({status: true,message:err});
            } else if (hash) {
           const admin = await Admin.create({Username, Email,Age, Password:hash})
            res.status(200).json({status: true, message:"ADMIN REGISETER", data: admin})
            }
            });
        }
    } catch(error) {
        res.status(200).json({status: true, message: error ,message: "SOMETHING WRONG !!!"})
    }
})
//Login
//Login
router.get("/Login/Admin", async (req, res) => {
    try {
        const{Email,Password} = req.body;
        let admin = await Admin.findOne({Email})      
        if (admin) {
            bcrypt.compare(Password,admin.Password,async (err,result) => {
               if (err) {
                     res.status(200).json({status: true ,message:" EMAIL OR PASSWORD ERROR",});
                }else if (result) {
                   const token = jwt.sign({
                    Username:admin.Username,
                    Email:admin.Email,Age:admin.Age},
                    process.env.SECRET_KEY,{
                        expiresIn:"2min"})
                   res.status("200").json({status: true,message:"YOU ARE CONNECTED ADMIN !!!",date:token})
                } 
            });
        } else{
         res.status("200").json({status: false,message:"INVILED ADMIN"})
        }    
    } catch(err) {
        res.status(200).json({status: false, message: err ,message:"SOMETHING WRONG !!!"})
    }
})
module.exports = router;