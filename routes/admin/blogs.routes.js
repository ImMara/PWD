const {ensureAuthenticated} = require("../../config/guards.config");
const router = require('express').Router();
const { getBlogs, getBlog , createBlogs , updateBlogs , deleteBlogs , upload } = require('../../controllers/blogs.controller');

// get routes
router.get('/',ensureAuthenticated,getBlogs)
router.get('/:id',getBlog)


// post route
router.post('/',upload.single('image'),createBlogs)
router.post('/update/:id',upload.single('image'),updateBlogs)

// delete route
router.delete('/:id',deleteBlogs)

module.exports= router;