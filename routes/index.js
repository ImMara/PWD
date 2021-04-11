const router = require('express').Router();
const { ensureAuthenticated } = require('../config/guards.config');
const auth= require('./auth.routes');


router.use('/admin',auth);

router.get('/', ((req, res) => res.render('home')))
router.get('/admin',ensureAuthenticated,(((req, res) => res.render('admin/index',))))

module.exports = router;