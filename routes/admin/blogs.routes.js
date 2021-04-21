const {ensureAuthenticated} = require("../../config/guards.config");
const router = require('express').Router();
const { getBlogs , createBlogs , upload } = require('../../controllers/blogs.controller');

router.get('/',ensureAuthenticated,getBlogs)
router.post('/',upload.single('image'),createBlogs)

module.exports= router;