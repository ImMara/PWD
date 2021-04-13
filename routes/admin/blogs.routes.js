const {ensureAuthenticated} = require("../../config/guards.config");
const router = require('express').Router();
const { getBlogs } = require('../../controllers/blogs.controller');

router.get('/',ensureAuthenticated,getBlogs)

module.exports= router;