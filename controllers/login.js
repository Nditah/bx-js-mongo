
const joi = require('joi');
const bcrypt = require("bcrypt-nodejs")

module.exports = (Model) => class {
    static get loginSchema(){
        return joi.object().keys({
            email : joi.string().email().required(),
            password : joi.string().min(6).max(32).required(),
        })
    }

    static login(req, res, next){
        Model.findOne({
            email : req.body.email
        })
        .then((data) => {
            let {dataValues: user} = data || {};
            if(!user){
                return res.status(400).json({email : 'email does not exist'})
            }else if(user && !bcrypt.compareSync(req.body.password, user.password)){
                console.log(user.password, req.body.password, bcrypt.compareSync(req.body.password, user.password))
                return res.status(400).json({password : 'incorrect password'})
            }else{
                return res.json(user)
            }
        }, next)
        .catch(next)
    }
}