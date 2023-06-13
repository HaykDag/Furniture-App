const mongoose = require('mongoose');
const Category = require('../models/categoryModel');


//get all categories
const getCategories = async(req,res,next)=>{
    try{
        const categories = await Category.find({});
        res.status(200).json(categories);
    }catch(err){
        next(err)
    }
    
}

//add a category
const addCategory = async(req,res,next)=>{
    const category = req.body;
    try{
        await Category.create({...category})
        res.status(200).json(category);
    }catch(err){
        next(err)
    }
}

//update category
const updateCategory = async (req,res,next)=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        next(createError(404,"no such item"))
    }

    const category = await Category.findByIdAndUpdate(id,{
        ...req.body
    })

    if(!category){
        next(createError(404,"no such category"))
    }
    
    res.status(200).json(category);
}

//delete category
const deleteCategory = async (req,res,next)=>{
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        next(createError(404,"no such item"))
    }

    const category = await Category.findByIdAndDelete(id);
    
    if(!category){
        next(createError(404,"no such item"))
    }
    res.status(200).json(category);
}

module.exports = { getCategories, addCategory, updateCategory, deleteCategory }