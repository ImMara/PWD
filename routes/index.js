const router = require('express').Router();
const { ensureAuthenticated } = require('../config/guards.config');

router.get('/', ((req, res) => res.render('home')))

module.exports = router;