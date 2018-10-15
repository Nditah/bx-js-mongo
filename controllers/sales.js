 
        const joi = require('joi');
        const Sales = require('../models/sales')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    kind : joi.string().valid('buy','sell').required(),
                    amount : joi.number().positive().precision(2).required()
                })
            }

            static create(req, res, next){
                Sales.create(req.body)
                .then(sales => res.json(sales), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    kind : joi.string().valid('buy','sell')
                })
            }

            static update(req, res, next){
                Sales.update({
                    _id : req.params.sale
                }, req.body)
                .then(({nModified: sale}) => res.json(Boolean(sale).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Sales.deleteOne({
                    _id : req.params.sale
                })
                .then(sale => res.json(Boolean(sale).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Sales.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(sale => res.json(sale), next)
                .catch(next)
            }
        
            static getOne(req, res, next){
                Sales.findById(req.params.sale)
                .then(sale => res.json(sale), next)
                .catch(next)
            }
        }
    