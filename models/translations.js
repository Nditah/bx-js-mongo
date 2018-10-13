

const mongoose = require('mongoose');
const {Schema} = mongoose;



const translationSchema = new Schema({
    name : {type: String}, 
    english : {type: String}, 
    language1 : {type: String},
    language2 : {type: String},
    language3 : {type: String},
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Translation', translationSchema);