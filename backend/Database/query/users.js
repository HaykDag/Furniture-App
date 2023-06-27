//get just users - id, username, isAdmin
const GET_USERS = `SELECT user_id, username, isAdmin, created FROM users`;

//get single user by id or username
const GET_SINGLE_USER = `SELECT * FROM users WHERE username = ? OR user_id = ?`;

//get user_password by username
const GET_PASSWORD = `SELECT user_password FROM users WHERE username = ?`;

//create user
const CREATE_USER = `INSERT INTO users(username,user_password,isAdmin) VALUES(? , ?, ?)`;

//delete user
const DELETE_USER = `DELETE FROM users WHERE user_id = ?`;

//get single user with their basket
const GET_SINGLE_USER_WITH_BASKET = `
    SELECT u.username, 
           u.isAdmin, 
           GROUP_CONCAT (DISTINCT i.title) as basket,
           GROUP_CONCAT (DISTINCT i.price) as basket_price,
           GROUP_CONCAT (DISTINCT i.item_id) as basket_item_id
    FROM users u
    JOIN basket b
    ON b.user_id=u.user_id
    JOIN items i
    ON b.item_id = i.item_id
    WHERE u.username = ? OR u.user_id = ?
    GROUP BY u.user_id`;

//get users with their basket
const GET_USERS_WITH_BASKET = `
    SELECT u.user_id, 
           username, 
           isAdmin, 
           GROUP_CONCAT (DISTINCT i.title) as basket
    FROM users u
    LEFT JOIN basket b
    ON b.user_id=u.user_id
    LEFT JOIN items i
    ON b.item_id = i.item_id
    GROUP BY u.user_id`;

module.exports = { GET_USERS,
                   GET_SINGLE_USER,
                   GET_PASSWORD,
                   CREATE_USER,
                   DELETE_USER,
                   GET_SINGLE_USER_WITH_BASKET, 
                   GET_USERS_WITH_BASKET }