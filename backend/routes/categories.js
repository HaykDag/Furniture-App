const express = require('express');
const {getCategories,updateCategory} = require('../controllers/categoryController');
const router = express.Router();

//Get all the categories
router.get('/', getCategories);

//update category
router.patch('/', updateCategory);


module.exports = router