
const bcrypt = require('bcrypt-nodejs');


module.exports = (schema, options) => {
    schema.pre('save', function(next){
        if(this.isModified('password')){
            bcrypt.hash(this.password,null,null,(err,hash) => {
                if(err) return next(err)
                this.password = hash;
                next()
            })
        }else{
            next();
        }
    })
}