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
    getBlogs
)
router.get('/:id',
    ensureAuthenticated,
    getBlog
)

// post route
router.post('/',
    ensureAuthenticated,
    uploadBlogs.single('image'),
    createBlogs
)
router.post('/update/:id',
    ensureAuthenticated,
    uploadBlogs.single('image'),
    updateBlogs
)

// delete route
router.delete('/:id',
    ensureAuthenticated,
    deleteBlogs
)

module.exports = router;