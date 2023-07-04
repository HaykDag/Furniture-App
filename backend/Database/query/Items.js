//get items 
const GET_ITEMS = `SELECT * FROM items`;

//get one Item by id or title
const GET_SINGLE_ITEM = `SELECT * FROM items WHERE id = ? OR title = ?`

//update an item
const UPDATE_ITEM = `
UPDATE items SET 
	title = ?,
    description = ?,
    price = ?
WHERE id = ?`;

//get items with their categories
const GET_ITEMS_WITH_CATEGORIES = `
SELECT 
	i.id,
    i.title,
    i.description,
    i.price, 
    GROUP_CONCAT( DISTINCT c.title) as tags 
FROM items as i
JOIN has_category as hc
ON i.id = hc.item_id
JOIN categories as c
ON c.id = hc.category_id
GROUP BY i.id`;

//get items with their categories and images
const GET_ITEMS_WITH_CATEGORIES_AND_IMAGES = `
SELECT  
    i.id, 
    i.title, 
    i.description, 
    GROUP_CONCAT( DISTINCT c.title) as tags,
    GROUP_CONCAT(DISTINCT img.image_url) as images, 
    i.price, 
    i.created
FROM items i
LEFT JOIN has_category hc
    ON i.id = hc.item_id
LEFT JOIN categories c
    ON c.id = hc.category_id
LEFT JOIN images img
    ON img.item_id = i.id
GROUP BY i.id`;

module.exports = { GET_ITEMS,
                   GET_SINGLE_ITEM,
                   UPDATE_ITEM,
                   GET_ITEMS_WITH_CATEGORIES,
                   GET_ITEMS_WITH_CATEGORIES_AND_IMAGES
                }