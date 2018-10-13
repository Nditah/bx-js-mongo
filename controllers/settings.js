 
        const joi = require('joi');
        const Settings = require('../models/settings')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    value : joi.string().required(),
                    name : joi.string().required(),
                    description : joi.string().required()
                })
            }

            static create(req, res, next){
                Settings.create(req.body)
                .then(settings => res.json(settings), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    value : joi.string(),
                    name : joi.string(),
                    description : joi.string()
                })
            }

            static update(req, res, next){
                Settings.update({
                    _id : req.params.settings
                }, req.body)
                .then(({nModified: settings}) => res.json(Boolean(settings).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Settings.deleteOne({
                    _id : req.params.settings
                })
                .then(settings => res.json(Boolean(settings).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Settings.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(settings => res.json(settings), next)
                .catch(next)
            }

            static getOne(req, res, next){
                Settings.findById(req.params.setting)
                .then(setting => res.json(setting), next)
                .catch(next)
            }
        }
    