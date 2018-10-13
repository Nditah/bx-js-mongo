 
        const joi = require('joi');
        const Notifications = require('../models/notifications')


        module.exports =  class {
            
            static get createSchema(){
                return joi.object().keys( {
                    userId : joi.number().positive().integer().required(),
                    message : joi.string().required(),
                })
            }

            static create(req, res, next){
                Notifications.create(req.body)
                .then(notifications => res.json(notifications), next)
                .catch(next)
            }

            static get updateSchema(){
                return joi.object().keys({
                    message : joi.string()
                })
            }

            static update(req, res, next){
                Notifications.update({
                    _id : req.params.notification
                }, req.body)
                .then(({nModified: notification}) => res.json(Boolean(notification).valueOf()), next)
                .catch(next)
            }
        
            static delete(req, res, next){
                Notifications.deleteOne({
                    _id : req.params.notification
                })
                .then(notification => res.json(Boolean(notification).valueOf()), next)
                .catch(next)
            }
        
            static get(req, res, next){
                Notifications.find({})
                .sort({created_at : 1})
                .skip(req.query.offset)
                .limit(req.query.limit)
                .then(notification => res.json(notification), next)
                .catch(next)
            }

            static getOne(req, res, next){
                Notifications.findById(req.params.notification)
                .then(notification => res.json(notification), next)
                .catch(next)
            }
        }
    