const mongoose = require('mongoose');
const Item = require('../models/itemModel');
const createError   = require('../utils/error');


//get all items
const getItems = async (req,res)=>{
    const items = await Item.find({}).sort({createdAt:-1});
    res.status(200).json(items)
}

//get a single item
const getItem = async (req,res,next)=>{
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        next(createError(404,"no such item"))
    }

    const item = await Item.findById(id);
    
    if(!item){
        next(createError(404,"no such item"))
    }
    res.status(200).json({item});
}

//create an item
const addItem = async(req,res,next)=>{
    
    const {title,description,price,images,tags=[]} = req.body;
    //add item to db
    try{
        const item = await Item.create({title,description,price,tags,images});
        res.status(200).json(item)
    }catch(error){
        next(error)
    }
}

//delete an item
const deleteItem = async (req,res,next)=>{
    const { id } = req.params;
 
    if(!mongoose.Types.ObjectId.isValid(id)){
        next(createError(404,"no such item"))
    }

    const item = await Item.findByIdAndDelete(id);
    
    if(!item){
        next(createError(404,"no such item"))
    }
    res.status(200).json(item);
}

//update an item
const EditItem = async (req,res,next)=>{
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        next(createError(404,"no such item"))
    }

    const item = await Item.findByIdAndUpdate(id,{
        ...req.body
    })

    if(!item){
        next(createError(404,"no such item"))
    }
    const newItem = {...item,...req.body}

    res.status(200).json(newItem);
}


module.exports = { addItem, getItems, getItem, deleteItem, EditItem}