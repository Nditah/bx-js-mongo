 
        const joi = require('joi');
        const Trades = require('../models/trades')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    kind : joi.string().valid('buy','sell').required(),
                    amount : joi.number().positive().precision(2).required()
                })
            }

            static create(req, res, next){
                Trades.create(req.body)
                .then(trades => res.json(trades), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    kind : joi.string().valid('buy','sell')
                })
            }

            static update(req, res, next){
                Trades.update({
                    _id : req.params.trade
                }, req.body)
                .then(({nModified: trade}) => res.json(Boolean(trade).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Trades.deleteOne({
                    _id : req.params.trade
                })
                .then(trade => res.json(Boolean(trade).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Trades.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(trade => res.json(trade), next)
                .catch(next)
            }
        
            static getOne(req, res, next){
                Trades.findById(req.params.trade)
                .then(trade => res.json(trade), next)
                .catch(next)
            }
        }
    