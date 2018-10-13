
const joi = require('joi');
const Admin = require('../models/admins')
const Login = require('./login')

module.exports =  class extends Login(Admin){
    
    static get createSchema(){
        return joi.object().keys( {
            email : joi.string().email().required(),
            password : joi.string().min(6).max(32).required(),
            username : joi.string().required(),
            address : joi.string().required(),
            fullname : joi.string().required(),
            role : joi.string().required(),
            //standing : joi.string().valid(['']).required(),
        })
    }

    static create(req, res, next){
        Admin.create(req.body)
        .then(admin => res.json(admin), next)
        .catch(next)
    }

    static get updateSchema(){
        return joi.object().keys({
            email : joi.string().email(),
            username : joi.string(),
            address : joi.string(),
            role : joi.string(),
            fullname : joi.string()
        })
    }

    static update(req, res, next){
        Admin.update({
            _id : req.params.admin
        }, req.body)
        .then(({nModified: admin}) => res.json(Boolean(admin).valueOf()), next)
        .catch(next)
    }

    static delete(req, res, next){
        Admin.deleteOne({
            _id : req.params.admin
        })
        .then(admin => res.json(Boolean(admin).valueOf()), next)
        .catch(next)
    }

    static get(req, res, next){
        Admin.find({})
        .sort({created_at : 1})
        .skip(req.query.offset)
        .limit(req.query.limit)
        .then(admin => res.json(admin), next)
        .catch(next)
    }

    static getOne(req, res, next){
        Admin.findById(req.params.admin)
        .then(admin => res.json(admin), next)
        .catch(next)
    }
}