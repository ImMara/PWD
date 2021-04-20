const {ensureAuthenticated} = require("../../config/guards.config");
const router = require('express').Router();
const { getBlogs , createBlogs } = require('../../controllers/blogs.controller');

router.get('/',ensureAuthenticated,getBlogs)
router.post('/',createBlogs)

module.exports= router;