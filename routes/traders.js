

const router = require('express').Router()
const Controller = require('../controllers/traders')
const Validator = require('../validator');

router.route(`/`)
      .get(Controller.get)
      .post(Validator(Controller.createSchema), Controller.create)

router.route(`/:trader`)
       .get(Controller.getOne)
       .delete(Controller.delete)
       .put(Validator(Controller.updateSchema), Controller.update)

       router.post('/login', Validator(Controller.loginSchema), Controller.login)
module.exports  = router;