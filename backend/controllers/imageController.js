const {pool} = require('../Database/database');
const authCheck = require('../utils/authCheck');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.COUDINARY_CLOUD_NAME,
    api_key: process.env.COUDINARY_API_KEY,
    api_secret: process.env.COUDINARY_API_SECRET
})

const deleteFromImages = async (req,res,next)=>{
    const {item_id,image_url} = req.body;
    let image_id = '';
   
        pool.query(`SELECT image_id FROM images WHERE item_id = ? AND image_url = ? `,[item_id,image_url])
        .then((result)=>{
            image_id = result[0][0].image_id;
            cloudinary.uploader.destroy(image_id)
        })
        .then(()=>{
            pool.query(`DELETE FROM images WHERE image_id = ?`,[image_id]);
            res.status(200).json(`image with url: ${image_url} is deleted from ${item_id} item's images`)
        })
        .catch(err=>console.log(err))  
}


module.exports = { deleteFromImages };