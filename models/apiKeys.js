

const mongoose = require('mongoose');
const {Schema} = mongoose;
const apiKeySchema = new Schema({
    name : {type: String}, 
    key : {type: String}, 
    url : {type: String}, 
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })


module.exports = mongoose.model('ApiKey', apiKeySchema);