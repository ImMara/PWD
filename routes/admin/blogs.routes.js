const {ensureAuthenticated} = require("../../config/guards.config");
const router = require('express').Router();
const { getBlogs , createBlogs , deleteBlogs , upload } = require('../../controllers/blogs.controller');

router.get('/',ensureAuthenticated,getBlogs)
router.post('/',upload.single('image'),createBlogs)
router.delete('/:id',deleteBlogs)

module.exports= router;