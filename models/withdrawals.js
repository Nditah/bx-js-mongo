

const mongoose = require('mongoose');
const {Schema} = mongoose;


const withdrawalSchema = new Schema({
    amount : {type: Schema.Types.Mixed}, 
    userType : {type: String, enum : ["trader","exchange"]},
    userId : {type : Schema.Types.ObjectId},
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Withdrawal',withdrawalSchema);