exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {

        next()

    } else {

        res.render('403', {currentUser: req.user});

    }
}

exports.roleAdmin = (req, res, next) => {
    if (req.user.role === 'ROLE_ADMIN' || req.user.role === 'ROLE_SUPERADMIN') {
        next()
    } else {
        res.render('403', {currentUser: req.user});
    }
}

exports.roleSuperAdmin = (req, res, next) => {
    if (req.user.role === 'ROLE_SUPERADMIN') {
        next()
    } else {
        res.render('403', {currentUser: req.user});
    }
}