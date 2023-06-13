const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    title:{
        type: String,
        requirerd: true,
    }
});


module.exports = mongoose.model('category',CategorySchema)