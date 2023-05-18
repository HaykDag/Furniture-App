const express = require('express');
//controller functions 
const { loginAdmin, signupAdmin, logoutAdmin } = require("../controllers/adminController");
const verifyToken = require('../utils/verifyToken');


const router = express.Router();

//verify
router.get('/verify',verifyToken, (req,res,next)=>{
    userName = req.adminUserName
    
    res.status(200).json({userName})
})

//login
router.post('/login',loginAdmin)

//singup
router.post('/signup',signupAdmin)

//logout
router.get('/logout',logoutAdmin)

module.exports = router;