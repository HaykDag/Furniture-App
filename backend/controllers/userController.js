const {pool} = require('../Database/database');
const createError   = require('../utils/error');
const generateToken = require('../utils/generateToken');
const authCheck = require('../utils/authCheck');
const bcrypt = require('bcrypt');
const { GET_USERS,
        GET_SINGLE_USER,
        GET_PASSWORD,
        CREATE_USER,
        DELETE_USER,
        GET_SINGLE_USER_WITH_BASKET,
        GET_USERS_WITH_BASKET
 } = require('../Database/query/users');

const signup = async (req,res,next)=>{
    const {username,password,isAdmin} = req.body;
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    try{
        const result = await pool.query(CREATE_USER,[username,hash,isAdmin ? true : false]);

        const user_id = result[0].insertId;
        generateToken(res,username);
        res.status(201).json({username, user_id});
    }catch(err){
        next(err)
    }
}

const login = async(req,res,next)=>{
    const {username,password} = req.body;

    const [row] = await pool.query(GET_PASSWORD,[username]);
   
    if(row.length === 0){
        next(createError(401,"Wrong username"));
    }
    
    const user_password = row[0]?.user_password;
    if(user_password){
        const match = await bcrypt.compare(password,user_password);

        if(!match){
            next(createError(401,"Wrong password"));
        }else{
            generateToken(res,username)
            res.status(200).json({username});
        }
    }
}
const verifyUser = async (req,res,next)=>{
    const username = req.username;
    const [row] = await pool.query(GET_SINGLE_USER_WITH_BASKET,[username,username]);
    const user = row[0];
    if(user.basket){
        const basket = user.basket.split(',');
        const itemPrice = user.basket_price.split(',');
        const itemID = user.basket_item_id.split(',');
        user.basket = [];
        for(let i = 0;i<basket.length;i++){
            user.basket.push(
                {
                    id:itemID[i],
                    price:itemPrice[i],
                    title:basket[i]
                }
            )
        }
        
    }else{
        user.basket = [];
    }

    res.status(200).json(user);

}

const getUsers = async(req,res,next)=>{
    const isAdmin = await authCheck(req.username);

    if(!isAdmin){
        next(createError(401,'You are not authenticated!'));
    }else{
        const [users] = await pool.query(GET_USERS);
    
        res.status(200).json(users)
    }
}

const deleteUser = async(req,res,next)=>{
    const { id } = req.params;

    const isAdmin = await authCheck(req.username);
    if(!isAdmin){
        next(createError(401,'You are not authenticated!'));
    }else{
        await pool.query(DELETE_USER,[id]);

        res.status(200).json(`user with id: ${id} is deleted.`)
    }  
}

//get users with basket joined
const getUsersWithBasket = async(req,res,next)=>{
    const isAdmin = await authCheck(req.username);

    if(!isAdmin){
        next(createError(401,'You are not authenticated!'));
    }else{
        const [users] = await pool.query(GET_USERS_WITH_BASKET);
        for(let user of users){
            if(user.basket){
                const basket = user.basket.split(',');
                user.basket = basket;
            }else{
                user.basket = [];
            }
        }
        res.status(200).json(users)
    }
}
module.exports = { signup, login, verifyUser, getUsers,deleteUser, getUsersWithBasket }