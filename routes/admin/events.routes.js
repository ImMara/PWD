const {updateEvents,createEvents,deleteEvents,getEvent} = require("../../controllers/events.controller");
const {ensureAuthenticated , roleAdmin} = require("../../config/guards.config");
const {uploadEvents} = require("../../config/multer.config");
const router = require('express').Router();
const {getEvents} = require('../../controllers/events.controller');

// get routes
router.get('/',
    ensureAuthenticated,
    roleAdmin,
    getEvents
)
router.get('/:id',
    ensureAuthenticated,
    roleAdmin,
    getEvent
)


//post route
router.post('/',
    ensureAuthenticated,
    roleAdmin,
    uploadEvents.single('image'),
    createEvents
)
router.post('/update/:id',
    ensureAuthenticated,
    roleAdmin,
    uploadEvents.single('image'),
    updateEvents
)

//detele route
router.delete('/:id',
    roleAdmin,
    ensureAuthenticated,
    deleteEvents
)
module.exports = router;