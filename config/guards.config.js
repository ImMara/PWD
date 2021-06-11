// GUARDS-#001
// USER CONNECTED

exports.ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {

        next()

    } else {

        res.render('403', {currentUser: req.user});

    }
}

//GUARDS-#OO2
// USER IS ADMIN

exports.roleAdmin = (req, res, next) => {
    if (req.user.role === 'ROLE_ADMIN' || req.user.role === 'ROLE_SUPERADMIN') {
        next()
    } else {
        res.render('403', {currentUser: req.user});
    }
}

// GUARDS-#003
// USER IS SUPERADMIN

exports.roleSuperAdmin = (req, res, next) => {
    if (req.user.role === 'ROLE_SUPERADMIN') {
        next()
    } else {
        res.render('403', {currentUser: req.user});
    }
}