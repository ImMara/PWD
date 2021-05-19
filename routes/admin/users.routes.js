const {deleteUser} = require("../../controllers/users.controller");
const {roleSuperAdmin} = require("../../config/guards.config");
const {ensureAuthenticated} = require("../../config/guards.config");
const router = require('express').Router();
const {getUsers,updateRole} = require('../../controllers/users.controller');

router.get('/',
    ensureAuthenticated,
    roleSuperAdmin,
    getUsers
)
router.patch('/:id',
    ensureAuthenticated,
    roleSuperAdmin,
    updateRole
)

// delete route
router.delete('/:id',
    ensureAuthenticated,
    roleSuperAdmin,
    deleteUser
)

module.exports = router;