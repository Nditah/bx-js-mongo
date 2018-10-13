
        
        const router = require('express').Router()
        const Controller = require('../controllers/currencies')
        const Validator = require('../validator');

        router.route(`/`)
            .get(Controller.get)
            .post(Validator(Controller.createSchema), Controller.create)

        router.route(`/:currency`)
            .get(Controller.getOne)
            .delete(Controller.delete)
            .put(Validator(Controller.updateSchema), Controller.update)

        module.exports  = router;
    