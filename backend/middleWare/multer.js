const multer = require('multer');

const imageStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./images')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + '--' +file.originalname)
    }
})

const upload = multer({storage:imageStorage})

module.exports = upload;