

const mongoose = require('mongoose');
const {Schema} = mongoose;


const templateSchema = new Schema({
    name : {type: String}, 
    page : {type: String}, 
    theme : {type: String}, 
    icon : {type: String}, 
    description : {type: String}, 
    placeholder : {type : String},
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Template',templateSchema);