const express = require('express');
const { addItem, 
        getItems, 
        getItem,
        deleteItem,
        EditItem,
        uploadImg
    } = require('../controllers/itemController')
const verifyToken = require('../utils/verifyToken');
/*
if I want to upload files
const upload = require('../middleWare/multer');
and use upload.array('images',5), as a midlleWare
*/

const router = express.Router();

//Get all the items
router.get('/', getItems)

//Get a single item
router.get('/:id',getItem)

//POST a new item
router.post('/',  addItem)

//upload an image
router.post('/upload', uploadImg)

//DELETE an Item
router.delete('/:id', verifyToken, deleteItem)

//EDIT an Item
router.patch('/:id', verifyToken, EditItem)


module.exports = router