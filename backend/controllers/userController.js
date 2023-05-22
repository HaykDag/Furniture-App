const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')


//login user
const loginUser = async (req,res,next)=>{
    const { userName, password } = req.body;

    try{
        const user = await User.login(userName,password);
        
        generateToken(res,user.userName);

        res.status(201).json({_id:user._id,userName:user.userName,isAdmin:user.isAdmin});
        
    } catch (error) {
        next(error)
    }
}

//singup admin
const signupUser = async (req,res,next)=>{
    let isAdmin = false;
  
    if(req.body.admin){
        isAdmin = req.body.admin
    }
    const {userName, password } = req.body;

    try{
        const user = await User.signup(userName,password, isAdmin);

        res.status(201).json({_id:user._id,userName:user.userName, isAdmin:user.isAdmin});

    }catch(error){
        next(error)
    }
}
//admin logOut
const logoutUser = async (req,res,next)=>{
    res.cookie('access_token',"",{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message:'logged out'})
}

//verify user
const verifyUser = async (req,res,next)=>{

    try {
        userName = req.userName
        const user = await User.findOne({ userName });

        res.status(200).json({userName, isAdmin:user.isAdmin})
    } catch (err) {
        next(err)
    }
}

module.exports = { loginUser, signupUser, logoutUser, verifyUser }

