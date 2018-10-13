    
const mongoose = require('mongoose');
const {Schema} = mongoose;



const pollSchema = new Schema({
    amount : {type: Schema.Types.Mixed},
    user : Schema.Types.ObjectId,
    vendor : Schema.Types.ObjectId,
    meta : Object,
    status : String,
    confirm_meta : Object,
    standing : {type: String, enum: ['pending','close']},
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Payment',pollSchema);