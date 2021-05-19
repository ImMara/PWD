const fs = require("fs");
const path = require('path');
const {deleteUsers} = require("../queries/users.queries");
const {findUser} = require("../queries/users.queries");
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

exports.deleteUser = async (req,res,next) =>{
    const userID = req.params.id;
    const user = await findUser(userID);
    try{
        let name = user.username;
        const image = user.image;
        if(image !== 'default.png'){
            fs.unlink(path.join(__dirname, `../public/images/users/resized/${image}`), (err => err && console.error(err)))
        }
        await deleteUsers(userID);

        const users = await findAllUsers();
        res.render('admin/users/index', {users, success: `successfully deleted ${name}`, currentUser: req.user})

    }catch (e) {
        next(e)
    }
}