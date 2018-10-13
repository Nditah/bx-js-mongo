 
        const joi = require('joi');
        const Votes = require('../models/votes')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                   userType : joi.number().positive().integer().required(),
                   transaction_amount : joi.number().precision(2).positive().required(),
                   transaction_currency : joi.string().required(),
                   choice : joi.string().valid('yes','no').required(),
                   comment : joi.string().required() 
                })
            }

            static create(req, res, next){
                Votes.create(req.body)
                .then(votes => res.json(votes), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                   choice : joi.string().valid('yes','no'),
                   comment : joi.string()
                })
            }

            static update(req, res, next){
                Votes.update({
                    _id : req.params.vote
                }, req.body)
                .then(({nModified: vote}) => res.json(Boolean(vote).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Votes.deleteOne({
                    _id : req.params.vote
                })
                .then(vote => res.json(Boolean(vote).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Votes.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(vote => res.json(vote), next)
                .catch(next)
            }
        

            static getOne(req, res, next){
                Votes.findById(req.params.vote)
                .then(vote => res.json(vote), next)
                .catch(next)
            }
        }
    