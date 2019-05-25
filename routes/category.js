const express = require('express');
const passport = require('passport');

const controller = require('./../controllers/category');
const router = express.Router();

router.get('/', passport.authenticate('jwt', { session: false }), controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.delete('/:id', controller.remove);
router.patch('/', controller.update);

module.exports = router;
