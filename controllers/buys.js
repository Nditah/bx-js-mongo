 
        const joi = require('joi');
        const Buys = require('../models/buys')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    kind : joi.string().valid('buy','sell').required(),
                    amount : joi.number().positive().precision(2).required()
                })
            }

            static create(req, res, next){
                Buys.create(req.body)
                .then(buys => res.json(buys), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    kind : joi.string().valid('buy','sell')
                })
            }

            static update(req, res, next){
                Buys.update({
                    _id : req.params.buy
                }, req.body)
                .then(({nModified: buy}) => res.json(Boolean(buy).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Buys.deleteOne({
                    _id : req.params.buy
                })
                .then(buy => res.json(Boolean(buy).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Buys.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(buy => res.json(buy), next)
                .catch(next)
            }
        
            static getOne(req, res, next){
                Buys.findById(req.params.buy)
                .then(buy => res.json(buy), next)
                .catch(next)
            }
        }
    