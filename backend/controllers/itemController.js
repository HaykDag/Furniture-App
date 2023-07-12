const {pool} = require('../Database/database');
const createError   = require('../utils/error');
const authCheck = require('../utils/authCheck');
const { GET_SINGLE_ITEM,
        UPDATE_ITEM,
        GET_ITEMS_WITH_CATEGORIES,
        GET_ITEMS_WITH_CATEGORIES_AND_IMAGES
    } = require('../Database/query/Items')
const {deleteImageFromCloudinary} = require('./imageController');
//get all items
const getItems = async (req,res)=>{
    const [rows] = await pool.query(GET_ITEMS_WITH_CATEGORIES_AND_IMAGES,);

    for(let row of rows){
        if(row.tags){
            const tags = row.tags.split(',');
            row.tags = tags;
        }else{
            row.tags = [];
        }
        if(row.images){
            const images = row.images.split(',');
            row.images = images;
        }else{
            row.images = [];
        }
    }
    res.status(200).json(rows);
}

//get a single item by id or title
const getItem = async (req,res,next)=>{
    const { id } = req.params;
    
    const [items] = await pool.query(GET_SINGLE_ITEM,[id,id]);
    
    if(!items[0]){
        next(createError(404,"no such item"))
    }
   
    res.status(200).json(items[0]);
}

//create an item and then selecting categoty_id using category_title 
//then inserting item_id and category_id into has_category
const addItem = async(req,res,next)=>{
    
    const {title, description, price, tagIds, imgUrl, imgId} = req.body;
    
   const isAdmin = await authCheck(req.username);
   if(!isAdmin){
        next(createError(401,'You are not authenticated!'))
   }else{
        try{
            const result =  await pool.query(`INSERT INTO items(title,description,price)VALUES (? , ?, ?)`,[title,description,price]);
            const id = result[0].insertId;
            for(let category_id of tagIds){
                await pool.query(`INSERT INTO has_category VALUES (?,?)`,[id,+category_id]);
            }
            if(imgUrl){
                await pool.query(`INSERT INTO images VALUES (?,?,?)`,[imgId,id,imgUrl]);
            }
            
            res.status(200).json(id)
        }catch(error){
            next(error)
        }
    }
}

//update an item
const EditItem = async (req,res,next)=>{
    const { id } = req.params;
    const {title,description,price,tagIds,imgUrl,imgId} = req.body;
    const isAdmin = await authCheck(req.username);

    if(!isAdmin){
        next(createError(401,'You are not authenticated!'))
    }else{
        const result = await pool.query(UPDATE_ITEM,[title, description,price,id]);
        if(!result[0].affectedRows){
            next(createError(404,"no such item"))
        }else{
            //I think to update the categories of the item in the has_category table 
            //I need to delete all the categories of the item in the has_category table and
            //insert new categories
            await pool.query(`DELETE FROM has_category WHERE item_id = ?`,[id]);
            for(let category_id of tagIds){
                await pool.query(`INSERT INTO has_category VALUES (?,?)`,[id,category_id]);
            }
            if(imgUrl){
                await pool.query(`INSERT INTO images VALUES (?,?,?)`,[imgId,id,imgUrl]);
            }
            res.status(200).json("done ")
        }
    }
}

//upload
const uploadItem = async(req,res,next)=>{
    const path = req.file.path;
    res.json({path})
}

//delete an item
const deleteItem = async (req,res,next)=>{
    const { id } = req.params;
    
    const isAdmin = await authCheck(req.username);
    if(!isAdmin){
        next(createError(401,'You are not authenticated!'))
    }else{
        try{
            const [images] = await pool.query(`SELECT image_id FROM images WHERE item_id = ?`,[id]);
    
            for(let {image_id} of images){
                await deleteImageFromCloudinary(image_id);
            }
            await pool.query(`DELETE FROM items WHERE id = ?`,[id]);
    
            res.status(200).json(`Item with id: ${id} is deleted.`)
        }catch(err){
            next(err)
        }
    }
}

//get items with tags joined
const getItemsWithTags = async (req,res,next)=>{
    const [rows] = await pool.query(GET_ITEMS_WITH_CATEGORIES,);

    for(let row of rows){
        const tags = row.tags.split(',');
        row.tags = tags;
    }
    res.status(200).json(rows)
}

//get items with tags joined
const getItemsWithTagsAndImages = async (req,res,next)=>{
    
    const [rows] = await pool.query(GET_ITEMS_WITH_CATEGORIES_AND_IMAGES,);

    for(let row of rows){
        if(row.tags){
            const tags = row.tags.split(',');
            row.tags = tags;
        }else{
            row.tags = [];
        }
        if(row.images){
            const images = row.images.split(',');
            row.images = images;
        }else{
            row.images = [];
        }
    }
    res.status(200).json(rows)
}

module.exports = { addItem,
                   getItems, 
                   getItem, 
                   deleteItem, 
                   EditItem, 
                   getItemsWithTags,
                   getItemsWithTagsAndImages,
                   uploadItem
                }