const {roleSuperAdmin} = require("../../config/guards.config");
const {ensureAuthenticated} = require("../../config/guards.config");
const router = require('express').Router();
const {getContents} = require('../../controllers/siteContents.controller');

router.get('/', ensureAuthenticated,roleSuperAdmin, getContents)

module.exports = router;