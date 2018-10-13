

const mongoose = require('mongoose');
const {Schema} = mongoose;


const voteSchema = new Schema({
    userType : {type: String, enum : ["exchange","trader"]}, 
    transaction  : {
        amount : {type: Schema.Types.Mixed},
        currency : {type: String},
    },
    pollId : {type: Schema.Types.ObjectId}, 
    choice : {type: String, enum : ["yes","no"]},
    comment : {type: String},
    standing : {type: String, enum:[]}
}, { timestamps: { createdAt: 'created_at', updatedAt : 'updated_last' } })


module.exports = mongoose.model('Vote', voteSchema);