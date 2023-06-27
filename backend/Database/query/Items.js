//get items 
const GET_ITEMS = `SELECT * FROM items`;

//get one Item by id or title
const GET_SINGLE_ITEM = `SELECT * FROM items WHERE item_id = ? OR title = ?`


//get items with their categories
const GET_ITEMS_WITH_CATEGORIES = `
    SELECT  i.item_id as id, 
        i.title, 
        i.description, 
        GROUP_CONCAT( DISTINCT c.category_title) as tags, 
        i.price, 
        i.created
    FROM items i
    LEFT JOIN has_category hs
    ON i.item_id = hs.item_id
    JOIN category c
    ON c.category_id = hs.category_id
    GROUP BY i.item_id`;

//get items with their categories and images
const GET_ITEMS_WITH_CATEGORIES_AND_IMAGES = `
    SELECT  i.item_id as id, 
            i.title, 
            i.description, 
            GROUP_CONCAT( DISTINCT c.category_title) as tags,
            GROUP_CONCAT (DISTINCT img.url) as images, 
            i.price, 
            i.created
    FROM items i
    LEFT JOIN has_category hs
    ON i.item_id = hs.item_id
    LEFT JOIN category c
    ON c.category_id = hs.category_id
    LEFT JOIN images img
    ON img.item_id = i.item_id
    GROUP BY i.item_id`

module.exports = { GET_ITEMS,
                   GET_SINGLE_ITEM,
                   GET_ITEMS_WITH_CATEGORIES,
                   GET_ITEMS_WITH_CATEGORIES_AND_IMAGES
                }