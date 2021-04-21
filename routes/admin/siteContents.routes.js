const {ensureAuthenticated} = require("../../config/guards.config");
const router = require('express').Router();
const {getContents} = require('../../controllers/siteContents.controller');

router.get('/', ensureAuthenticated, getContents)

module.exports = router;