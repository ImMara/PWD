const router = require('express').Router();
const {ensureAuthenticated} = require('../config/guards.config');
const admin = require('./admin.routes');
const {googleAuth, googleAuthCb} = require('../controllers/auth.controller');
const api = require('./api.routes');

router.use('/api', api)
router.use('/admin', admin);
router.get('/google', googleAuth);
router.get('/google/cb', googleAuthCb);

router.get('/', ((req, res) => {
    if (req.user) {
        res.redirect("/admin");
    }
    if(!req.user){
        res.render('home');
    }
}))

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