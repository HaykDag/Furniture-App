const express = require('express');
//controller functions 
const { loginUser, signupUser, logoutUser, verifyUser } = require("../controllers/userController");
const verifyToken = require('../utils/verifyToken');


const router = express.Router();

//verify
router.get('/verify',verifyToken, verifyUser)

//login
router.post('/login',loginUser)

//singup
router.post('/signup',signupUser)

//logout
router.get('/logout',logoutUser)

module.exports = router;