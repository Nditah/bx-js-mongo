 
        const joi = require('joi');
        const Currencies = require('../models/currencies')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    name : joi.string().required(),
                    title : joi.string().required(),
                    description : joi.string().required(),
                    kind : joi.string().valid('digital','flat').required(),
                    symbol : joi.string().required(),
                    rate : joi.number().precision(2).required(),
                    icon : joi.string().required(),
                })
            }

            static create(req, res, next){
                Currencies.create(req.body)
                .then(currencies => res.json(currencies), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    name : joi.string(),
                    title : joi.string(),
                    description : joi.string(),
                    kind : joi.string().valid('digital','flat'),
                    symbol : joi.string(),
                    rate : joi.number().precision(2),
                    icon : joi.string(),
                })
            }

            static update(req, res, next){
                Currencies.update({
                    _id : req.params.currency
                }, req.body)
                .then(({nModified: currency}) => res.json(Boolean(currency).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Currencies.deleteOne({
                    _id : req.params.currency
                })
                .then(currency => res.json(Boolean(currency).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Currencies.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(currency => res.json(currency), next)
                .catch(next)
            }

            static getOne(req, res, next){
                Currencies.findById(req.params.currency)
                .then(currency => res.json(currency), next)
                .catch(next)
            }
        }
    