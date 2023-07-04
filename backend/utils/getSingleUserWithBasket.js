const { GET_SINGLE_USER_WITH_BASKET } = require("../Database/query/users");
const {pool} = require('../Database/database');

const getSingleUserWithBasket = async (username)=>{

    const [row] = await pool.query(GET_SINGLE_USER_WITH_BASKET,[username,username]);
    const user = row[0];
    
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