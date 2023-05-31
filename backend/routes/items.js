const express = require('express');
const { addItem, 
        getItems, 
        getItem,
        deleteItem,
        EditItem,
    } = require('../controllers/itemController')
const verifyToken = require('../utils/verifyToken');

const router = express.Router();

//Get all the items
router.get('/', getItems)

//Get a single item
router.get('/:id',getItem)

//POST a new item
router.post('/',  addItem)

//DELETE an Item
router.delete('/:id', deleteItem)

//EDIT an Item
router.patch('/:id',EditItem)


module.exports = router