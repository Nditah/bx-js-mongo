

const mongoose = require('mongoose');
const {Schema} = mongoose;


const traderSchema = new Schema({
    email : {type: String, lowercase: true}, 
    passwords : {type: String}, 
    name : {type: String}, 
    phone : {type: String}, 
    country : {type: String}, 
    hotWallet : {type: Schema.Types.ObjectId}, 
    coldWallet : {type: Schema.Types.ObjectId},
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Trader',traderSchema);