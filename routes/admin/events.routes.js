const {updateEvents,createEvents,deleteEvents,getEvent} = require("../../controllers/events.controller");
const {ensureAuthenticated} = require("../../config/guards.config");
const {uploadEvents} = require("../../config/multer.config");
const router = require('express').Router();
const {getEvents} = require('../../controllers/events.controller');

// get routes
router.get('/',
    ensureAuthenticated,
    getEvents
)
router.get('/:id',
    ensureAuthenticated,
    getEvent
)


//post route
router.post('/',
    ensureAuthenticated,
    uploadEvents.single('image'),
    createEvents
)
router.post('/update/:id',
    ensureAuthenticated,
    uploadEvents.single('image'),
    updateEvents
)

//detele route
router.delete('/:id',
    ensureAuthenticated,
    deleteEvents
)
module.exports = router;