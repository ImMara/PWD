const {findAllUsers} = require("../queries/users.queries");

exports.getUsers = async (req, res, next) => {
    try {

        const users = await findAllUsers();
        res.render('admin/users/index', {users, currentUser: req.user})

    } catch (e) {

        next(e)

    }
}