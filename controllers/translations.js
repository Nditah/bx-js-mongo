 
        const joi = require('joi');
        const Translations = require('../models/translations')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                  name : joi.string().required(),
                  english : joi.string().required(),
                  language1 : joi.string().required(),
                  language2 : joi.string().required(),
                  language3 : joi.string().required()  
                })
            }

            static create(req, res, next){
                Translations.create(req.body)
                .then(translations => res.json(translations), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    name : joi.string(),
                    english : joi.string(),
                    language1 : joi.string(),
                    language2 : joi.string(),
                    language3 : joi.string()
                })
            }

            static update(req, res, next){
                Translation.update({
                    _id : req.params.translation
                }, req.body)
                .then(({nModified: translation}) => res.json(Boolean(translation).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Translation.deleteOne({
                    _id : req.params.translation
                })
                .then(translation => res.json(Boolean(translation).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Translation.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(translation => res.json(translation), next)
                .catch(next)
            }
        
            static getOne(req, res, next){
                Translations.findById(req.params.translation)
                .then(translation => res.json(translation), next)
                .catch(next)
            }
        }
    