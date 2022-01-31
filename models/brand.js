const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const brandSchema = new Schema({
    name: {type: String, required: true},
    website: {type: String, required: true},
    industry: {type: String, required: false},
    description: {type: String, required: false},
    image: {type: String, required: false},
}, {timestamp: true});

module.exports = mongoose.model('Brand', brandSchema)