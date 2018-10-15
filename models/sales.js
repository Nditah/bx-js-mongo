

const mongoose = require('mongoose');
const {Schema} = mongoose;



const tradeSchema = new Schema({
    amount : {type: Schema.Types.Mixed}, 
    standing : {type: String, enum : ["pending","closed"]} 
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Sale', tradeSchema);