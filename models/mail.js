

const mongoose = require('mongoose');
const {Schema} = mongoose;


const mailSchema = new Schema({
    message : {type: String},
    recipient : {type: String, lowercase: true},
    subject : {type: String},
    sentAt : {type: Date},
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Mail',mailSchema);