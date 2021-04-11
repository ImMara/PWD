const {ensureAuthenticated} = require("../config/guards.config");
const router = require('express').Router();
const { login , logout} = require('../controllers/auth.controller');

router.get('/',ensureAuthenticated,(((req, res) => res.render('admin/index', { currentUser: req.user }))))
router.post('/login',login)
router.get('/logout',logout)

module.exports= router;