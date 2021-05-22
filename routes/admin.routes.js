const {ensureAuthenticated} = require("../config/guards.config");
const router = require('express').Router();
const {login, logout} = require('../controllers/auth.controller');

const events = require('./admin/events.routes')
const users = require('./admin/users.routes')
const blogs = require('./admin/blogs.routes')
const siteContents = require('./admin/siteContents.routes')

router.get('/', ensureAuthenticated, (((req, res) => res.render('admin/index', {currentUser: req.user}))))
router.get('/logout', logout)


router.use('/events', events)
router.use('/users', users)
router.use('/blogs', blogs)
router.use('/siteContents', siteContents)


router.post('/login', login)

router.use(function(req, res, next) {
    res.status(404);

    // respond with html page
    if (req.accepts('html')) {
        res.render('404', { currentUser : req.user , url: req.url });
        return;
    }

    // respond with json
    if (req.accepts('json')) {
        res.json({ error: 'Not found' });
        return;
    }

    // default to plain-text. send()
    res.type('txt').send('Not found');
});

module.exports = router;