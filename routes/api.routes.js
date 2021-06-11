const {getEvent} = require("../controllers/api.controller");
const {getEvents} = require("../controllers/api.controller");
const router = require('express').Router();
const {getBlogs, getBlog} = require('../controllers/api.controller')

router.get('/blogs',
    getBlogs
)
router.get('/blogs/:id',
    getBlog
)
router.get('/events', getEvents)
router.get('/events/:id',
    getEvent
)
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