//get just users - id, username, isAdmin
const GET_USERS = `SELECT id, username, isAdmin, created FROM users`;

//get single user by id or username
const GET_SINGLE_USER = `SELECT * FROM users WHERE username = ? OR id = ?`;

//get single user by id
const GET_SINGLE_USER_BY_ID = `SELECT * FROM users WHERE id = ?`;

//get single user by username
const GET_SINGLE_USER_BY_USERNAME = `SELECT * FROM users WHERE username = ?`;

//get user_password by username
const GET_PASSWORD = `SELECT password FROM users WHERE username = ?`;

//create user
const CREATE_USER = `INSERT INTO users(username,password,isAdmin) VALUES(? , ?, ?)`;

//delete user
const DELETE_USER = `DELETE FROM users WHERE id = ?`;

//get single user with their basket
const GET_USER_WITH_BASKET_BY_USERNAME = `
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
LEFT JOIN items AS i
    ON i.id = b.item_id
WHERE u.username = ?
GROUP BY u.id;`;

//get single user with their basket
const GET_USER_WITH_BASKET_BY_ID = `
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
LEFT JOIN items AS i
    ON i.id = b.item_id
WHERE u.id = ?
GROUP BY u.id;`;

//get users with their basket
const GET_USERS_WITH_BASKET = (page = 1, pageSize = 50, value = "") => {
    const query = `
        SELECT u.id, 
            username, 
            isAdmin, 
            GROUP_CONCAT (DISTINCT i.title) as basket
        FROM users u
        LEFT JOIN basket b
        ON b.user_id=u.id
        LEFT JOIN items i
        ON b.item_id = i.id
        WHERE u.username LIKE "%${value}%"
        GROUP BY u.id
        LIMIT ${(page - 1) * pageSize} , ${pageSize}`;
    return query;
};

module.exports = {
    GET_USERS,
    GET_SINGLE_USER,
    GET_SINGLE_USER_BY_ID,
    GET_SINGLE_USER_BY_USERNAME,
    GET_PASSWORD,
    CREATE_USER,
    DELETE_USER,
    GET_USER_WITH_BASKET_BY_ID,
    GET_USER_WITH_BASKET_BY_USERNAME,
    GET_USERS_WITH_BASKET,
};
