 
        const joi = require('joi');
        const Polls = require('../models/polls')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    name : joi.string().required(),
                    title : joi.string().required(),
                    description : joi.string().required(),
                    kind : joi.string().valid('coin','others').required()
                })
            }

            static create(req, res, next){
                Polls.create(req.body)
                .then(polls => res.json(polls), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    name : joi.string(),
                    title : joi.string(),
                    description : joi.string(),
                    kind : joi.string().valid('coin','others')
                })
            }

            static update(req, res, next){
                Polls.update({
                    _id : req.params.poll
                }, req.body)
                .then(({nModified: poll}) => res.json(Boolean(poll).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Polls.deleteOne({
                    _id : req.params.poll
                })
                .then(poll => res.json(Boolean(poll).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Polls.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(poll => res.json(poll), next)
                .catch(next)
            }
            static getOne(req, res, next){
                Polls.findById(req.params.poll)
                .then(poll => res.json(poll), next)
                .catch(next)
            }
        }
    