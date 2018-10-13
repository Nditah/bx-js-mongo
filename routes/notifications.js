
        
        const router = require('express').Router()
        const Controller = require('../controllers/notifications')
        const Validator = require('../validator');

        router.route(`/`)
            .get(Controller.get)
            .post(Validator(Controller.createSchema), Controller.create)

        router.route(`/:notification`)
            .get(Controller.getOne)
            .delete(Controller.delete)
            .put(Validator(Controller.updateSchema), Controller.update)

        module.exports  = router;
    