//get just users - id, username, isAdmin
const GET_USERS = `SELECT id, username, isAdmin, created FROM users`;

//get single user by id or username
const GET_SINGLE_USER = `SELECT * FROM users WHERE username = ? OR id = ?`;

//get user_password by username
const GET_PASSWORD = `SELECT password FROM users WHERE username = ?`;

//create user
const CREATE_USER = `INSERT INTO users(username,password,isAdmin) VALUES(? , ?, ?)`;

//delete user
const DELETE_USER = `DELETE FROM users WHERE id = ?`;

//get single user with their basket
const GET_SINGLE_USER_WITH_BASKET = `
SELECT 
    u.id,
    u.username,
    u.isAdmin,
    GROUP_CONCAT(DISTINCT i.id) as basket_item_id,
    GROUP_CONCAT(DISTINCT i.title) as basket,
    GROUP_CONCAT(DISTINCT i.price) as basket_price
FROM users AS u
LEFT JOIN basket AS b
    ON u.id = b.user_id
JOIN items AS i
    ON i.id = b.item_id
WHERE u.username = ? OR u.id = ?
GROUP BY u.id;`;

//get users with their basket
const GET_USERS_WITH_BASKET = `
    SELECT u.id, 
           username, 
           isAdmin, 
           GROUP_CONCAT (DISTINCT i.title) as basket
    FROM users u
    LEFT JOIN basket b
    ON b.user_id=u.id
    LEFT JOIN items i
    ON b.item_id = i.id
    GROUP BY u.id`;

module.exports = { GET_USERS,
                   GET_SINGLE_USER,
                   GET_PASSWORD,
                   CREATE_USER,
                   DELETE_USER,
                   GET_SINGLE_USER_WITH_BASKET, 
                   GET_USERS_WITH_BASKET }