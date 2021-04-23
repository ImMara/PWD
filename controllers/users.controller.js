const {findUserAndUpdate} = require("../queries/users.queries");
const {findAllUsers} = require("../queries/users.queries");

exports.getUsers = async (req, res, next) => {
    try {

        const users = await findAllUsers();
        res.render('admin/users/index', {users, currentUser: req.user})

    } catch (e) {

        next(e)

    }
}

exports.updateRole = async (req, res , next) =>{
    const userID = req.params.id;
    try{

        const body = req.body;
        await findUserAndUpdate(userID,body,{runValidators:true})
        res.end()

    }catch (e) {

        next(e)

    }
}