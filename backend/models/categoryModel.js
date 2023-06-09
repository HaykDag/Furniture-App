const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({categories:[String]});


module.exports = mongoose.model('category',CategorySchema)