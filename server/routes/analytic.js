const express = require('express');
const passport = require('passport');

const controller = require('./../controllers/analytic');
const router = express.Router();

router.get('/analytics', passport.authenticate('jwt', { session: false }), controller.analytic);
router.get('/overview', passport.authenticate('jwt', { session: false }), controller.overview);

module.exports = router;
