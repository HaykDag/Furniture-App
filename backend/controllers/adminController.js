const Admin = require('../models/adminModel')
const jwt = require('jsonwebtoken');

const createToken = (_id)=>{
    return jwt.sign({_id},process.env.SECRET,{ expiresIn: '1d' })
}

//login user
const loginAdmin = async (req,res)=>{
    const { userName, password } = req.body;

    try{
        const admin = await Admin.login(userName,password);
        const token = createToken(admin._id);
        
        res.cookie('access_token',token,{httpOnly:true, expiresIn:"1d"}).status(200).json({userName, token});
    } catch (error) {
        next(error)
    }
}

//singup user
const signupAdmin = async (req,res)=>{
    const {userName, password } = req.body;

    try{
        const admin = await Admin.signup(userName,password);

        const token = createToken(admin._id);

        res.cookie('access_token',token,{httpOnly:true, expiresIn:"1d"}).status(200).json({userName, token});
    }catch(error){
        next(error)
    }
}

module.exports = { loginAdmin, signupAdmin }