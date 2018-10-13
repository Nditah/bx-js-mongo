

const mongoose = require('mongoose');
const {Schema} = mongoose;


const notificationSchema = new Schema({
    message : {type: String}, 
    sentAt : {type: Date}, 
    standing : {type: String, enum : ["read","unread"]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })


module.exports = mongoose.model('Notification',notificationSchema);