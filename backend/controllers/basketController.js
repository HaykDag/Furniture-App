const {pool} = require('../Database/database');
const createError   = require('../utils/error');
const authCheck = require('../utils/authCheck');
const {GET_SINGLE_USER } = require('../Database/query/users')

const addIntoBasket = async (req,res,next)=>{
    const {id} = req.body;
    const [user] = await pool.query(GET_SINGLE_USER,[req.username,req.username]);
    
    const result = await pool.query(`
        INSERT INTO basket VALUES (? , ?)
    `,[id,user[0].id]);
    
    res.status(201).json(`Item with id: ${id} is added into ${req.username}'s basket`)
}

const deleteFrombasket = async (req,res,next)=>{
    const { id } = req.params;
    const [user] = await pool.query(GET_SINGLE_USER,[req.username,req.username]);
    await pool.query(`
        DELETE FROM basket WHERE item_id = ? AND user_id = ?
    `,[id,user[0].id]);

    res.status(200).json(`Item with id: ${id} is deleted from ${req.username}'s basket`)
}


module.exports = { addIntoBasket, deleteFrombasket };