const {roleAdmin} = require("../../config/guards.config");
const {ensureAuthenticated} = require("../../config/guards.config");
const router = require('express').Router();
const {
    getBlogs,
    getBlog,
    createBlogs,
    updateBlogs,
    deleteBlogs
} = require('../../controllers/blogs.controller');
const { uploadBlogs } = require('../../config/multer.config')

// get routes
router.get('/',
    ensureAuthenticated,
    roleAdmin,
    getBlogs
)
router.get('/:id',
    ensureAuthenticated,
    roleAdmin,
    getBlog
)

// post route
router.post('/',
    ensureAuthenticated,
    roleAdmin,
    uploadBlogs.single('image'),
    createBlogs
)
router.post('/update/:id',
    ensureAuthenticated,
    roleAdmin,
    uploadBlogs.single('image'),
    updateBlogs
)

// delete route
router.delete('/:id',
    ensureAuthenticated,
    roleAdmin,
    deleteBlogs
)

module.exports = router;