 
        const joi = require('joi');
        const Withdrawals = require('../models/withdrawals')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    amount : joi.number().precision(2).positive().required(),
                    userType : joi.string().valid('exchange','trader').required(),
                    userId : joi.number().positive().integer().required(),
                })
            }

            static create(req, res, next){
                Withdrawals.create(req.body)
                .then(withdrawals => res.json(withdrawals), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    userType : joi.string().valid('exchange','trader').required(),
                })
            }

            static update(req, res, next){
                Withdrawals.update({
                    _id : req.params.withdrawal
                }, req.body)
                .then(({nModified: withdrawal}) => res.json(Boolean(withdrawal).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Withdrawals.deleteOne({
                    _id : req.params.withdrawal
                })
                .then(withdrawal => res.json(Boolean(withdrawal).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Withdrawals.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(withdrawal => res.json(withdrawal), next)
                .catch(next)
            }
        

            static getOne(req, res, next){
                Withdrawals.findById(req.params.withdrawal)
                .then(withdrawal => res.json(withdrawal), next)
                .catch(next)
            }
        }
    