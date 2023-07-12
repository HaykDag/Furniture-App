const {pool} = require('../Database/database');
const createError   = require('../utils/error');
const authCheck = require('../utils/authCheck');
const { GET_SINGLE_USER_BY_USERNAME } = require('../Database/query/users')

const addIntoBasket = async (req,res,next)=>{
    const {id} = req.body;
    
    const isAdmin = await authCheck(req.username);

    if(!isAdmin){
        next(createError(401,'You are not authenticated!'))
    }else{
        try{
            const [user] = await pool.query(GET_SINGLE_USER_BY_USERNAME,[req.username]);
            await pool.query(`INSERT INTO basket VALUES (? , ?)`,[id,user[0].id]);
            res.status(201).json(`Item with id: ${id} is added into ${req.username}'s basket`)
        }catch(err){
            next(err)
        }
    }
}

const deleteFrombasket = async (req,res,next)=>{
    const { id } = req.params;
    const isAdmin = await authCheck(req.username);

    if(!isAdmin){
        next(createError(401,'You are not authenticated!'))
    }else{
        try{
            const [user] = await pool.query(GET_SINGLE_USER_BY_USERNAME,[req.username]);
            await pool.query(`
                DELETE FROM basket WHERE item_id = ? AND user_id = ?
                `,[id,user[0].id]);

        res.status(200).json(`Item with id: ${id} is deleted from ${req.username}'s basket`);
        }catch(err){
            next(err)
        }
    }
}


module.exports = { addIntoBasket, deleteFrombasket };