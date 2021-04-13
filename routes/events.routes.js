const {ensureAuthenticated} = require("../config/guards.config");
const router = require('express').Router();
const { getEvents } = require('../controllers/events.controller');

router.get('/',ensureAuthenticated,getEvents)

module.exports= router;