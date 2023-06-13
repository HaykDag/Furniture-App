const express = require('express');
//controller functions 
const { loginUser, signupUser, logoutUser, verifyUser, updateUser, getAllUsers, deleteUser } = require("../controllers/userController");
const verifyToken = require('../utils/verifyToken');


const router = express.Router();

//verify
router.get('/verify',verifyToken, verifyUser)

//get all users
router.get('/allUsers',getAllUsers)

//login
router.post('/login',loginUser)

//update
router.post('/update',updateUser)

//singup
router.post('/signup',signupUser)

//logout
router.get('/logout',logoutUser)

//delete user
router.delete('/:id', deleteUser);

module.exports = router;