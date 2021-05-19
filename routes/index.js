const router = require('express').Router();
const {ensureAuthenticated} = require('../config/guards.config');
const admin = require('./admin.routes');
const { googleAuth, googleAuthCb } = require('../controllers/auth.controller');
const api = require('./api.routes');

router.use('/api', api)
router.use('/admin', admin);
router.get('/google', googleAuth);
router.get('/google/cb', googleAuthCb);

router.get('/', ((req, res) => {
    if (req.user) {
        res.redirect("/admin");
    }
    res.render('home')
}))

module.exports = router;