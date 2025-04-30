const mongoose = require('mongoose');
const { Schema } = mongoose;

const articleSchema = new Schema({
    telephone: String,
    lastName: String,
    firstName: String,
    email: String,
    age: Number,
    country: String,
    gender: String,
},{ timestamps: true });

const Article = mongoose.model('dUser', articleSchema);
module.exports = Article;