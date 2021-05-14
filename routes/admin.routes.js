const {ensureAuthenticated} = require("../config/guards.config");
const router = require('express').Router();
const {login, logout, getUsers} = require('../controllers/auth.controller');

const events = require('./admin/events.routes')
const users = require('./admin/users.routes')
const blogs = require('./admin/blogs.routes')
const siteContents = require('./admin/siteContents.routes')

router.get('/', ensureAuthenticated, (((req, res) => res.render('admin/index', {currentUser: req.user}))))
router.get('/logout', logout)


router.use('/events', events)
router.use('/users',  users)
router.use('/blogs', blogs)
router.use('/siteContents', siteContents)

router.post('/login', login)

module.exports = router;