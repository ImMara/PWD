const router = require('express').Router();
const { ensureAuthenticated } = require('../config/guards.config');
const admin = require('./admin.routes');


router.use('/admin',admin);

router.get('/', ((req, res) =>{
    if(req.user){
        res.redirect("/admin");
    }
    res.render('home')
}))


module.exports = router;