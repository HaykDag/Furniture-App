const express = require('express');
const {getCategories, addCategory, updateCategory,deleteCategory} = require('../controllers/categoryController');
const router = express.Router();

//Get all the categories
router.get('/', getCategories);

//Add a category
router.post('/', addCategory);

//update category
router.patch('/:id', updateCategory);

//delete category
router.delete('/:id', deleteCategory);


module.exports = router