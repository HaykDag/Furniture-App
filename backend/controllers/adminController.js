const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken')


//login user
const loginAdmin = async (req,res,next)=>{
    const { userName, password } = req.body;

    try{
        const admin = await Admin.login(userName,password);
        
        generateToken(res,admin.userName)
        res.status(201).json({_id:admin._id,userName:admin.userName})
        
    } catch (error) {
        next(error)
    }
}

//singup admin
const signupAdmin = async (req,res,next)=>{
    const {userName, password } = req.body;

    try{
        const admin = await Admin.signup(userName,password);

        res.status(201).json({_id:admin._id,userName:admin.userName});

    }catch(error){
        next(error)
    }
}
//admin logOut
const logoutAdmin = async (req,res,next)=>{
    res.cookie('access_token',"",{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message:'logged out'})
}
module.exports = { loginAdmin, signupAdmin, logoutAdmin }