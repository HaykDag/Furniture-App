const express = require('express');
//controller functions 
const { loginUser, signupUser, logoutUser, verifyUser, updateUser } = require("../controllers/userController");
const verifyToken = require('../utils/verifyToken');


const router = express.Router();

//verify
router.get('/verify',verifyToken, verifyUser)

//login
router.post('/login',loginUser)

//update
router.post('/update',updateUser)

//singup
router.post('/signup',signupUser)

//logout
router.get('/logout',logoutUser)

module.exports = router;