

const mongoose = require('mongoose');
const {Schema} = mongoose;


const marketSchema = new Schema({
    name : {type: String}, 
    title : {type: String}, 
    description : {type: String}, 
    pair : {type: String},
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Market',marketSchema);