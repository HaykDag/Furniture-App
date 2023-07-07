const express = require('express');
const { addItem, 
        getItems, 
        getItem,
        deleteItem,
        EditItem,
        getItemsWithTags,
        getItemsWithTagsAndImages,
        uploadItem
    } = require('../controllers/itemController')
const verifyToken = require('../utils/verifyToken');
const upload = require('../utils/multer');

const router = express.Router();

//Get all the items
router.get('/', getItems)

//test
router.get('/getItemsWithTags', getItemsWithTags)
//test 2
router.get('/getItemsWithTagsAndImages', getItemsWithTagsAndImages)

//Get a single item
router.get('/:id',getItem);

//POST a new item
router.post('/',verifyToken, addItem)

//router.post('/upload',upload.single('image'),uploadItem)

//DELETE an Item
router.delete('/:id',verifyToken, deleteItem)

//EDIT an Item
router.put('/:id',verifyToken, EditItem)


module.exports = router