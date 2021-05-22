const {getEvent} = require("../controllers/api.controller");
const {getEvents} = require("../controllers/api.controller");
const {getContent} = require("../controllers/api.controller");
const router = require('express').Router();
const {getBlogs, getBlog} = require('../controllers/api.controller')

router.get('/blogs',
    getBlogs
)
router.get('/blogs/:id',
    getBlog
)
router.get('/content',
    getContent
)
router.get('/events',
    getEvents
)
router.get('/events/:id',
    getEvent
)

module.exports = router;