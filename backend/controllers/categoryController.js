const mongoose = require('mongoose');
const Category = require('../models/categoryModel');

//document ID
const id = "64827105c429ed321dbd323a"

//get all categories
const getCategories = async(req,res)=>{
    
    const doc= await Category.findById(id);
    res.status(200).json(doc.categories);
}

//add a category
const updateCategory = async(req,res,next)=>{
    console.log(req.body)
    const categories = req.body;
    try{
        await Category.findByIdAndUpdate(id,{...categories})
        res.status(200).json(categories);
    }catch(err){
        next(err)
    }
}

module.exports = { getCategories, updateCategory }