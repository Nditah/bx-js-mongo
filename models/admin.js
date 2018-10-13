

const mongoose = require('mongoose');
const {Schema} = mongoose;


const adminSchema = new Schema({
    email : {type: String, lowercase : true}, 
    password : {type: String}, 
    username : {type: String}, 
    fullname : {type: String}, 
    phone : {type: String}, 
    address : {type: String}, 
    role : {type: String}, 
    standing : {type: String, enum:[]}
},{ timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Admin',adminSchema);