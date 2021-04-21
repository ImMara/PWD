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
router.get('/', ensureAuthenticated, getBlogs)
router.get('/:id', getBlog)

// post route
router.post('/', uploadBlogs.single('image'), createBlogs)
router.post('/update/:id', uploadBlogs.single('image'), updateBlogs)

// delete route
router.delete('/:id', deleteBlogs)

module.exports = router;