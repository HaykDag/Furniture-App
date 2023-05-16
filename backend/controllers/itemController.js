const mongoose = require('mongoose');
const Item = require('../models/itemModel');
const createError   = require('../utils/error');
const fs = require('fs');

//get all items
const getItems = async (req,res)=>{

    const items = await Item.find({}).sort({createdAt:-1});
    /*
    if I want to send the image file too
    const imageData = [];
    items.map(item=>{
        if(item.images.length>0){
            const thumbnail = ({
                data: fs.readFileSync(item.images[0]),
                contentType: "image/png"
            })
           imageData.push(thumbnail)
        }else{
            imageData.push("")
        }
    })
    res.status(200).json({items,imageData})
    */
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
    let imageData = [];
    item.images.forEach(image=>{
        imageData.push({
            data: fs.readFileSync(image),
            contentType: "image/png"
        })
    })
    
    res.status(200).json({item,imageData});
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
const uploadImg = async (req,res,next)=>{
    const images = [];
    req.files.forEach(image =>{
        images.push({name:'./images/' + image.filename});
    });
    res.status(200).json(images);
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

    res.status(200).json(item);
}


module.exports = { addItem, getItems, getItem, deleteItem, EditItem, uploadImg}