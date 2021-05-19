const {uploadContents} = require("../../config/multer.config");
const {updateContents} = require("../../controllers/siteContents.controller");
const {roleSuperAdmin} = require("../../config/guards.config");
const {ensureAuthenticated} = require("../../config/guards.config");
const router = require('express').Router();
const {getContents} = require('../../controllers/siteContents.controller');

router.get('/', ensureAuthenticated,roleSuperAdmin, getContents)

router.post('/update/:id',
        ensureAuthenticated,
        roleSuperAdmin,
        uploadContents.single('image'),
        updateContents
    )

module.exports = router;