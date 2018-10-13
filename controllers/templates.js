 
        const joi = require('joi');
        const Templates = require('../models/templates')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    name : joi.string().required(),
                    page : joi.string().required(),
                    theme : joi.string().required(),
                    icon : joi.string().required(),
                    description : joi.string().required()
                })
            }

            static create(req, res, next){
                Templates.create(req.body)
                .then(templates => res.json(templates), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    name : joi.string(),
                    page : joi.string(),
                    theme : joi.string(),
                    icon : joi.string(),
                    description : joi.string()
                })
            }

            static update(req, res, next){
                Templates.update({
                    _id : req.params.template
                }, req.body)
                .then(({nModified: template}) => res.json(Boolean(template).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Templates.deleteOne({
                    _id : req.params.template
                })
                .then(template => res.json(Boolean(template).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Templates.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(template => res.json(template), next)
                .catch(next)
            }
        

            static getOne(req, res, next){
                Templates.findById(req.params.template)
                .then(template => res.json(template), next)
                .catch(next)
            }
        }
    