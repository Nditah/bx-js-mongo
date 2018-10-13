 
        const joi = require('joi');
        const Markets = require('../models/markets')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    name : joi.string().required(),
                    title : joi.string().required(),
                    description : joi.string().required(),
                    pair : joi.string().required()
                })
            }

            static create(req, res, next){
                Markets.create(req.body)
                .then(markets => res.json(markets), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    name : joi.string(),
                    title : joi.string(),
                    description : joi.string(),
                    pair : joi.string()
                })
            }

            static update(req, res, next){
                Markets.update({
                    _id : req.params.market
                }, req.body)
                .then(({nModified: market}) => res.json(Boolean(market).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Markets.deleteOne({
                    _id : req.params.market
                })
                .then(market => res.json(Boolean(market).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Markets.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(market => res.json(market), next)
                .catch(next)
            }

            static getOne(req, res, next){
                Markets.findById(req.params.market)
                .then(market => res.json(market), next)
                .catch(next)
            }
        }
    