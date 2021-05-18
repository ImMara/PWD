exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {

        next()

    } else {

        res.redirect('/');

    }
}

exports.roleAdmin = (req , res , next) =>{
    if (req.user.role === 'ROLE_ADMIN' || req.user.role === 'ROLE_SUPERADMIN'){
        next()
    }else{
        res.redirect('/');
    }
}

exports.roleSuperAdmin = (req , res, next) =>{
    if(req.user.role ==='ROLE_SUPERADMIN'){
        next()
    }else{
        res.redirect('/');
    }
}