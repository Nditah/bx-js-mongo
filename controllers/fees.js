 
        const joi = require('joi');
        const Fees = require('../models/fees')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    name : joi.strict().required(),
                    description : joi.string().required(),
                    amount : joi.number().positive().precision(2).required(),
                    kind : joi.string().valid('fixed','percentage').required()
                })
            }

            static create(req, res, next){
                Fees.create(req.body)
                .then(fees => res.json(fees), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    name : joi.strict(),
                    description : joi.string(),
                    amount : joi.number().positive().precision(2),
                    kind : joi.string().valid('fixed','percentage')
                })
            }

            static update(req, res, next){
                Fees.update({
                    _id : req.params.fee
                }, req.body)
                .then(({nModified: fee}) => res.json(Boolean(fee).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Fees.deleteOne({
                    _id : req.params.fee
                })
                .then(fee => res.json(Boolean(fee).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Fees.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(fee => res.json(fee), next)
                .catch(next)
            }
            
            static getOne(req, res, next){
                Fees.findById(req.params.fee)
                .then(fee => res.json(fee), next)
                .catch(next)
            }
        }
    