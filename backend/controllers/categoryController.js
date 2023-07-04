const {pool} = require('../Database/database');
const authCheck = require('../utils/authCheck');
const createError   = require('../utils/error');

//get all categories
const getCategories = async(req,res,next)=>{
    try{
        const result = await pool.query('SELECT * FROM categories');
        const categories = result[0]
        res.status(200).json(categories);
    }catch(err){
        next(err)
    }
    
}
const getOneCategoryById = async(req,res,next)=>{

    const {id} = req.params;
    try{
        const result = await pool.query(`SELECT * FROM categories WHERE id = ${id}`);
        const category = result[0];
        res.status(200).json(category)
    }catch(err){
        next(err)
    }
}
//add a category
const addCategory = async(req,res,next)=>{
    const {title} = req.body;
    
    const isAdmin = await authCheck(req.username);
    
    if(!isAdmin){
        next(createError(401,'You are not authenticated!'))
    }else{
        try{
            const result =  await pool.query(`INSERT INTO categories(title) VALUES (?)`,[title]);
            const id = result[0].insertId;
            res.status(200).json({id,title});
        }catch(err){
            next(err)
        }
    }
}

//update category
const updateCategory = async (req,res,next)=>{
    const { id } = req.params;
    const {category_title} = req.body;

    const isAdmin = await authCheck(req.username);
    if(!isAdmin){
        next(createError(401,'You are not authenticated!'))
    }else{
        const result = await pool.query(`UPDATE categories SET title = ? WHERE id = ?`,[category_title,id]);

    if(!result[0].affectedRows){
            next(createError(404,"no such category"))
        }else{
            res.status(200).json({id,category_title})
        }
    }
}

//delete category
const deleteCategory = async (req,res,next)=>{
    const { id } = req.params;

    const isAdmin = await authCheck(req.username);
    if(!isAdmin){
        next(createError(401,'You are not authenticated!'))
    }else{
        await pool.query(`DELETE FROM categories WHERE id = ?`,[id]);
        res.status(200).json(`category with id: ${id} is deleted.`)
    }
}

module.exports = { getCategories,getOneCategoryById, addCategory, updateCategory, deleteCategory }