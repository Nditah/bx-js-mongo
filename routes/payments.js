

const router = require('express').Router();
const Validator = require('../validator');
const Controller = require('../controllers/payments');


router.route(`/`)
      .post(Validator(Controller.createSchema), Controller.create)
      .get(Controller.get)

router.get(`/:payment`, Controller.getOne)

router.get(`/:payment/confirm`, Controller.confirm)

module.exports = router;