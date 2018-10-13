 
        const joi = require('joi');
        const Languages = require('../models/languages')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    name : joi.string().required(),
                    title : joi.string().required(),
                    description : joi.string().required(),
                    icon : joi.string().required()
                })
            }

            static create(req, res, next){
                Languages.create(req.body)
                .then(languages => res.json(languages), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    name : joi.string(),
                    title : joi.string(),
                    description : joi.string(),
                    icon : joi.string()
                })
            }

            static update(req, res, next){
                Languages.update({
                    _id : req.params.language
                }, req.body)
                .then(({nModified: language}) => res.json(Boolean(language).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Languages.deleteOne({
                    _id : req.params.language
                })
                .then(language => res.json(Boolean(language).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Languages.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(language => res.json(language), next)
                .catch(next)
            }

            static getOne(req, res, next){
                Languages.findById(req.params.language)
                .then(language => res.json(language), next)
                .catch(next)
            }
        }
    