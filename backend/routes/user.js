const express = require('express');
const verifyToken = require('../utils/verifyToken');
//controller functions 
const { signup,
        login,
        logoutUser,
        verifyUser,
        getUsers,
        deleteUser,
        getUsersWithBasket
    } = require("../controllers/userController");

const router = express.Router();

// //verify
router.get('/verify',verifyToken, verifyUser)

//get all users
router.get('/', verifyToken, getUsers)

//get all users basket joined to them
router.get('/getUsersWithBasket',verifyToken, getUsersWithBasket);

// //login
router.post('/login',login)

// //update
// router.post('/update', verifyToken, updateUser)

// //singup
router.post('/signup',signup)

//logout 
router.get('/logout',logoutUser);

// //delete user
router.delete('/:id', verifyToken, deleteUser);

module.exports = router;