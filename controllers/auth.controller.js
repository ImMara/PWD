const passport = require('passport')

exports.login = ( req , res , next ) => {
    passport.authenticate('local', (err , user , info) =>{
        if(err){
            next(err)
        }else if(!user){
            res.render('home',{errors: [ info.message ] , isAuthenticated: req.isAuthenticated(), currentUser: req.user })
        }else{
            req.login(user,(err)=>{
                if(err){ next(err) }else{
                    res.redirect('/admin')
                }
            } )
        }
    })(req , res , next)
}

exports.logout = ( req , res , next ) =>{
    req.logout();
    res.redirect('/');
}

