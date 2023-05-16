const express = require('express');
//controller functions 
const { loginAdmin, signupAdmin } = require("../controllers/adminController");
const verifyToken = require('../utils/verifyToken');


const router = express.Router();

// router.get('/check',verifyToken, (req,res,next)=>{
//     res.send('hello admin I love you!')
// })


//login
router.post('/login',loginAdmin)

//singup
router.post('/signup',signupAdmin)


module.exports = router;