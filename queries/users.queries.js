const User = require('../database/models/user.model')

exports.createUser = async (user) => {
    try {

        const hashedPassword = await User.hashPassword(user.password);

        const newUser = new User({
            username: user.username,
            local: {
                email: user.email,
                password: hashedPassword
            }
        })

        return newUser.save();

    } catch (e) {

        throw e;

    }
}
exports.findUser = (id) =>{
    return User.findById(id)
}

exports.findUserPerEmail = (email) => {

    return User.findOne({'local.email': email}).exec();

}

exports.findUserPerId = (id) => {

    return User.findById(id).exec();

}

exports.findUserAndUpdate = (id, user) => {

    return User.findByIdAndUpdate(id, {$set: user}, {runValidators: true});

}

exports.findAllUsers = () => {

    return User.find({}, '-local.password');

}

exports.findUserPerGoogleId = (googleId) => {

    return User.findOne({ 'local.googleId': googleId }).exec();

}

exports.deleteUsers = (id) =>{

    return User.findByIdAndDelete(id).exec();

}