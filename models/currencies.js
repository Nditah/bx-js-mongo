

const mongoose = require('mongoose');
const {Schema} = mongoose;


const currencySchema = new Schema({
    name : {type: String}, 
    title : {type: String}, 
    description : {type: String}, 
    kind : {type: String, enum : ["fiat","digital"]}, 
    symbol : {type: String}, 
    rate : {type: Schema.Types.Mixed}, 
    icon : {type: String}, 
    standing : {type: String, enum:[]}, 
    action : {type: String}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })


module.exports = mongoose.model('Currency', currencySchema);