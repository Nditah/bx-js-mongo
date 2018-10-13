
const joi = require('joi');
const Blogs = require('../models/blogs')


module.exports =  class {
    
    static get createSchema(){
        return joi.object().keys( {
            title : joi.string().required(),
            author : joi.number().integer().positive().required(),
            summary : joi.string().required(),
            body : joi.string().required(),
            images : joi.string().required(),
            url : joi.string().required(),
            keywords : joi.string().required(),
            placeholders : joi.string().required(),
            //standing : joi.string().valid(['']).required(),
        })
    }

    static create(req, res, next){
        Blogs.create(req.body)
        .then(blogs => res.json(blogs), next)
        .catch(next)
    }

    static get updateSchema(){
        return joi.object().keys({
            title : joi.string(),
            author : joi.number().integer().positive(),
            summary : joi.string(),
            body : joi.string(),
            images : joi.string(),
            url : joi.string(),
            keywords : joi.string(),
            placeholders : joi.string()
        })
    }

    static update(req, res, next){
        Blogs.update({
            _id : req.params.blog
        }, req.body)
        .then(({nModified: blog}) => res.json(Boolean(blog).valueOf()), next)
        .catch(next)
    }

    static delete(req, res, next){
        Blogs.deleteOne({
            _id : req.params.blog
        })
        .then(blog => res.json(Boolean(blog).valueOf()), next)
        .catch(next)
    }

    static get(req, res, next){
        Blogs.find({})
        .sort({created_at : 1})
        .skip(req.query.offset)
        .limit(req.query.limit)
        .then(blog => res.json(blog), next)
        .catch(next)
    }

    static getOne(req, res, next){
        Blogs.findById(req.params.blog)
        .then(blogs => res.json(blogs), next)
        .catch(next)
    }
}