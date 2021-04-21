const {updateEvents,createEvents,deleteEvents,getEvent} = require("../../controllers/events.controller");
const {ensureAuthenticated} = require("../../config/guards.config");
const {uploadEvents} = require("../../config/multer.config");
const router = require('express').Router();
const {getEvents} = require('../../controllers/events.controller');

// get routes
router.get('/', ensureAuthenticated, getEvents)
router.get('/:id', getEvent)


//post route
router.post('/', uploadEvents.single('image'), createEvents)
router.post('/update/:id', uploadEvents.single('image'), updateEvents)

//detele route
router.delete('/:id', deleteEvents)
module.exports = router;