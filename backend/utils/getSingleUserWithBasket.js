const { GET_USER_WITH_BASKET_BY_USERNAME, GET_USER_WITH_BASKET_BY_ID } = require("../Database/query/users");
const {pool} = require('../Database/database');

const getSingleUserWithBasket = async ({username,id})=>{
    let user = null;
    if(username){
        const [row] = await pool.query(GET_USER_WITH_BASKET_BY_USERNAME,[username]);
        user = row[0];
    }else{
        const [row] = await pool.query(GET_USER_WITH_BASKET_BY_ID,[id]);
        user = row[0];
    }
    
    if(!user){
        return undefined;
    }else{
        if(user.basket){
            
            const [items] = await pool.query(`SELECT id,title, price FROM items WHERE id IN (${user.basket_item_id})`); 
            
            user.basket = items;
                    
        }else{
            user.basket = [];
        }
    }
    
    return user;
}

module.exports =  getSingleUserWithBasket;