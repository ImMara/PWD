const {ensureAuthenticated} = require("../config/guards.config");
const router = require('express').Router();
const { login , logout , getUsers } = require('../controllers/auth.controller');

const events = require('./events.routes')
const users = require('./users.routes')

router.get('/',ensureAuthenticated,(((req, res) => res.render('admin/index', { currentUser: req.user }))))
router.get('/logout',logout)


router.use('/events',events)
router.use('/users',users)

router.post('/login',login)

module.exports= router;