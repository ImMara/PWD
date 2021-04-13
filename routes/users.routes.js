const {ensureAuthenticated} = require("../config/guards.config");
const router = require('express').Router();
const { getUsers } = require('../controllers/users.controller');

router.get('/',ensureAuthenticated, getUsers)

module.exports= router;