

const mongoose = require('mongoose');
const {Schema} = mongoose;

const blogSchema = new Schema({
    title : {type: String}, 
    summary : {type: String}, 
    body : {type: String}, 
    url : {type: String}, 
    keywords : [{type: String}], 
    images : {type: String}, 
    placeholders : {type: String}, 
    author : {type: Schema.Types.ObjectId}, 
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Blog', blogSchema);