 
        const joi = require('joi');
        const Deposits = require('../models/deposits')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    amount : joi.number().precision(2).positive().required(),
                    userType : joi.string().valid('exchange','trader').required(),
                    userId : joi.number().positive().integer().required(),
                })
            }

            static create(req, res, next){
                Deposits.create(req.body)
                .then(deposits => res.json(deposits), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    userType : joi.string().valid('exchange','trader').required(),
                })
            }

            static update(req, res, next){
                Deposits.update({
                    _id : req.params.deposit
                }, req.body)
                .then(({nModified: deposit}) => res.json(Boolean(deposit).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Deposits.deleteOne({
                    _id : req.params.deposit
                })
                .then(deposit => res.json(Boolean(deposit).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Deposits.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(deposit => res.json(deposit), next)
                .catch(next)
            }

            static getOne(req, res, next){
                Deposits.findById(req.params.deposit)
                .then(deposit => res.json(deposit), next)
                .catch(next)
            }
        }
    