

const mongoose = require('mongoose');
const {Schema} = mongoose;


const operatorSchema = new Schema({
    title : {type: String}, 
    description : {type: Sting},
    slogan : {type: String}, 
    domainName : {type: String}, 
    subdomain : {type: String}, 
    domain : {type: String}, 
    businessName : {type: String}, 
    businessEmail : {type: String}, 
    businessAddress : {type: String}, 
    email : {type: String, lowercase : true}, 
    password : {type: String}, 
    businessOwner : {
        fullname : {type: String},
        phone : {type: String},
        email : {type: String, lowercase : true},
        address : {type: String}
    },
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })

module.exports = mongoose.model('Operator',operatorSchema);