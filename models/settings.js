

const mongoose = require('mongoose');
const {Schema} = mongoose;


const settingSchema = new Schema({
    name : {type: String},
    value : {type: String},
    description : {type: String},
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })


module.exports = mongoose.model('Setting',settingSchema);