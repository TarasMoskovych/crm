const express = require('express');
const controller = require('./../controllers/analytic');
const router = express.Router();

router.get('/analytics', controller.analytic);
router.get('/overview', controller.overview);

module.exports = router;
