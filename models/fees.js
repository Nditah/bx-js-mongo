

const mongoose = require('mongoose');
const {Schema} = mongoose;


const feeSchema = new Schema({
    name : {type: String},
    description : {type: String},
    amount : {type: Schema.Types.Mixed},
    kind : {type: String, enum : ["fixed","percentage"]},
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Fee',feeSchema);