const {pool} = require('../Database/database');
const createError   = require('../utils/error');
const authCheck = require('../utils/authCheck');
const { GET_ITEMS,
        GET_SINGLE_ITEM,
        GET_ITEMS_WITH_CATEGORIES,
        GET_ITEMS_WITH_CATEGORIES_AND_IMAGES,
    } = require('../Database/query/Items')

//get all items
const getItems = async (req,res)=>{
    const [rows] = await pool.query(GET_ITEMS_WITH_CATEGORIES_AND_IMAGES,);

    for(let row of rows){
        if(row.Tags){
            const tags = row.Tags.split(',');
            row.Tags = tags;
        }else{
            row.Tags = [];
        }
        if(row.images){
            const images = row.images.split(',');
            row.images = images;
        }else{
            row.images = [];
        }
    }
    res.status(200).json(rows)
    // const [items] = await pool.query(GET_ITEMS);
    // res.status(200).json(items)
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

//create an item
const addItem = async(req,res,next)=>{
    
    const {title, description, price} = req.body;
    
    const isAdmin = await authCheck(req.username);
    if(!isAdmin){
        next(createError(401,'You are not authenticated!'))
    }else{
        try{
            const result =  await pool.query(`
                INSERT INTO items(title,description,price)
                VALUES (? , ?, ?)
                `,[title,description,price]);
            const id = result[0].insertId;
            res.status(200).json(id)
        }catch(error){
            next(error)
        }
    }
}

//delete an item
const deleteItem = async (req,res,next)=>{
    const { id } = req.params;
    
    const isAdmin = await authCheck(req.username);
    if(!isAdmin){
        next(createError(401,'You are not authenticated!'))
    }else{
        await pool.query(`DELETE FROM items WHERE item_id = ?`,[id]);
    
        res.status(200).json(`Item with id: ${id} is deleted.`)
    }
}

//update an item
const EditItem = async (req,res,next)=>{
    const { id } = req.params;
    const {title,description,price} = req.body;

    const isAdmin = await authCheck(req.username);

    if(!isAdmin){
        next(createError(401,'You are not authenticated!'))
    }else{
        const result = await pool.query(`UPDATE items
                      SET title = ?, 
                          description = ?, 
                          price = ?
                      WHERE item_id = ?
        `,[title, description, price,id]);
    
        if(!result[0].affectedRows){
            next(createError(404,"no such item"))
        }else{
            res.status(200).json(id)
        }
    }
}

//get items with tags joined
const getItemsWithTags = async (req,res,next)=>{
    const [rows] = await pool.query(GET_ITEMS_WITH_CATEGORIES,);

    for(let row of rows){
        const tags = row.Tags.split(',');
        row.Tags = tags;
    }
    res.status(200).json(rows)
}

//get items with tags joined
const getItemsWithTagsAndImages = async (req,res,next)=>{
    
    const [rows] = await pool.query(GET_ITEMS_WITH_CATEGORIES_AND_IMAGES,);

    for(let row of rows){
        if(row.Tags){
            const tags = row.Tags.split(',');
            row.Tags = tags;
        }else{
            row.Tags = [];
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
                   getItemsWithTagsAndImages
                }