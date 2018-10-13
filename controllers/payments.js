
const Payment = require('../models/payments');
const joi = require('joi')
const axios = require('axios');

module.exports = class paymentController{

    static get createSchema(){
        return joi.object().keys({
            meta : joi.object().required(),
            vendor : joi.number().integer().positive().required(),
            user : joi.number().integer().positive().required(),
            amount : joi.number().required()
        })
    }

    static doConfirm({meta}){
        return new Promise((resolve, reject) => {
            axios.post("https://ravesandboxapi.flutterwave.com/flwv3-pug/getpaidx/api/v2/verify",{
                SECKEY : "FLWSECK-855a5975b8b62a378087700e54f7f944-X",
                 txref: meta.tx.txRef
            },{ headers : {'content-type' : 'application/json'}})
            .then(({data}) => resolve(data), reject)
            .catch(reject)
        })
    }


    static create(req, res, next){
        Payment.create(req.body)
        .then(payment  => Promise.all([Promise.resolve(payment), paymentController.doConfirm(payment)]))
        .then(([payment, confirmation]) => {
            payment.status = confirmation.status;
            payment.confirm_meta = confirmation;
            return payment.save()
        })
        .then(payment => res.json(payment), next)
        .catch(next)
    }


    static confirm(req, res){
        Payment.findById(req.params.payment)
        .then(payment  => Promise.all([Promise.resolve(payment), paymentController.doConfirm(payment)]))
        .then(([payment, confirmation]) => {
            console.log({confirmation, payment})
            payment.status = confirmation.status;
            payment.confirm_meta = confirmation;
            return payment.save()
        })
        .then(payment => res.json(payment), next)
        .catch(next)
    }

    static update(req, res, next){
        Payment.update({
            _id : req.params.payment
        }, req.body)
        .then(({nModified: payment}) => res.json(Boolean(payment).valueOf()), next)
        .catch(next)
    }

    static delete(req, res, next){
        Payment.deleteOne({
            _id : req.params.payment
        })
        .then(payment => res.json(Boolean(payment).valueOf()), next)
        .catch(next)
    }

    static get(req, res, next){
        Payment.find({})
        .sort({created_at : 1})
        .skip(req.query.offset)
        .limit(req.query.limit)
        .then(payment => res.json(payment), next)
        .catch(next)
    }

    static getOne(req, res, next){
        Payment.findById(req.params.payment)
        .then(payment => res.json(payment), next)
        .catch(next)
    }
}