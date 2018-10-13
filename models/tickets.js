

const mongoose = require('mongoose');
const {Schema} = mongoose;


const ticketSchema = new Schema({
    title : {type: String}, 
    description : {type: String}, 
    urgency : {type: String}, 
    date : {type: Date},
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })


module.exports = mongoose.model('Ticket',ticketSchema);