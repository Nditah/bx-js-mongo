

const mongoose = require('mongoose');
const {Schema} = mongoose;



const pollSchema = new Schema({
    name : {type: String}, 
    title : {type: String}, 
    description : {type: String}, 
    kind  : {type: String, enum : ["coin","other"]},
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Poll',pollSchema);