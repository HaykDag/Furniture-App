const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");
const mongoose = require('mongoose')
const authCheck = require('../utils/authCheck');

//login user
const loginUser = async (req, res, next) => {
    const { userName, password } = req.body;

    try {
        const user = await User.login(userName, password);

        generateToken(res, user.userName);
        const { _id, isAdmin, basket } = user;
        res.status(201).json({ _id, userName, isAdmin, basket });
    } catch (error) {
        next(error);
    }
};

//get All users 
const getAllUsers = async(req,res,next)=>{

    if(!authCheck(req.userName)){
        next(createError(401,'You are not authenticated!'))
    }
    
    try {
        const users = await User.find({},{password:false});
        
        res.status(201).json(users);
    } catch (error) {
        next(error);
    }
}

//update user
const updateUser = async (req, res, next) => {
    const { userName, basket } = req.body;

    try {
        await User.findOneAndUpdate({ userName }, { basket });
        res.status(201).json({ userName, basket });
    } catch (error) {
        next(error);
    }
};

//singup admin
const signupUser = async (req, res, next) => {
    let isAdmin = false;

    if (req.body.admin) {
        isAdmin = req.body.admin;
    }
    const { userName, password } = req.body;

    try {
        const user = await User.signup(userName, password, isAdmin);
        generateToken(res, userName);
        res.status(201).json({ _id: user._id, userName, isAdmin, basket:user.basket });
    } catch (error) {
        next(error);
    }
};

// logOut
const logoutUser = async (req, res, next) => {
    res.cookie("access_token", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "logged out" });
};

//delete a user
const deleteUser = async (req,res,next)=>{
    const { id } = req.params;
 
    if(!mongoose.Types.ObjectId.isValid(id)){
        next(createError(404,"no such user"))
    }

    const user = await User.findByIdAndDelete(id);
    
    if(!user){
        next(createError(404,"no such user"))
    }
    res.status(200).json(user);
}

//verify user
const verifyUser = async (req, res, next) => {
    try {
        userName = req.userName;
        const user = await User.findOne({ userName });
        const { isAdmin, basket } = user;
        res.status(200).json({ userName, isAdmin, basket });
    } catch (err) {
        next(err);
    }
};

module.exports = { loginUser, signupUser, logoutUser, verifyUser, updateUser, getAllUsers, deleteUser };
