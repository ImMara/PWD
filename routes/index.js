const router = require('express').Router();
const { ensureAuthenticated } = require('../config/guards.config');
const auth= require('./auth.routes');


router.use('/admin',auth);

router.get('/', ((req, res) =>{
    if(req.user){
        res.redirect("/admin");
    }
    res.render('home')
} ))


module.exports = router;