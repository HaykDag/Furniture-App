//get all orders in desc order
const GET_ORDERS = () => {
    const query = `
    SELECT 
	    o.id,
        o.user_id,
        u.username,
        o.item_id,
        i.title,
        i.description,
        i.price,
        o.order_status,
        o.payment_status,
        o.created
    FROM orders AS o
    JOIN users AS u
	    ON u.id = o.user_id
    JOIN items AS i
	    ON i.id = o.item_id
    ORDER BY o.created DESC`;
    return query;
};

const GET_ORDER_BY_ID = (id) => {
    const query = `
        SELECT 
            o.id,
            o.user_id,
            u.username,
            o.item_id,
            i.title,
            i.description,
            i.price,
            o.order_status,
            o.payment_status,
            o.created
        FROM orders AS o
        JOIN users AS u
            ON u.id = o.user_id
        JOIN items AS i
            ON i.id = o.item_id
        WHERE o.id = ${id}
        `;
    return query;
};

const GET_ORDERS_BY_USER_ID = (id) => {
    const query = `
        SELECT 
        o.id,
        o.user_id,
        u.username,
        o.item_id,
        i.title,
        i.description,
        i.price,
        o.order_status,
        o.payment_status,
        o.created
    FROM orders AS o
    JOIN users AS u
        ON u.id = o.user_id
    JOIN items AS i
        ON i.id = o.item_id
    WHERE o.user_id = ${id}
    `;
    return query;
};

const GET_ORDERS_BY_ITEM_ID = (id) => {
    const query = `
        SELECT 
        o.id,
        o.user_id,
        u.username,
        o.item_id,
        i.title,
        i.description,
        i.price,
        o.order_status,
        o.payment_status,
        o.created
    FROM orders AS o
    JOIN users AS u
        ON u.id = o.user_id
    JOIN items AS i
        ON i.id = o.item_id
    WHERE o.item_id = ${id}
    `;
    return query;
};

const ADD_ORDER = () => {
    const query = `
        INSERT INTO orders(user_id,item_id)
        VALUES (?,?)
    `;
    return query;
};

const UPDATE_ORDER = () => {
    const query = `
        UPDATE orders SET
            order_status = ?,
            payment_status = ?
        WHERE id = ?
    `;
    return query;
};

const DELETE_ORDER = () => {
    const query = `DELETE FROM orders WHERE id = ?`;
    return query;
};

module.exports = {
    GET_ORDERS,
    GET_ORDER_BY_ID,
    GET_ORDERS_BY_USER_ID,
    GET_ORDERS_BY_ITEM_ID,
    ADD_ORDER,
    UPDATE_ORDER,
    DELETE_ORDER,
};
