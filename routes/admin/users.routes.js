const {ensureAuthenticated} = require("../../config/guards.config");
const router = require('express').Router();
const {getUsers,updateRole} = require('../../controllers/users.controller');

router.get('/',
    ensureAuthenticated,
    getUsers
)
router.patch('/:id',
    ensureAuthenticated,
    updateRole
)


module.exports = router;