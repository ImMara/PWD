const User = require('../database/models/user.model')

// CREATE USER
// USER-#001

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

// FIND USER
// USER-#002

exports.findUser = (id) => {
    return User.findById(id)
}

// FIND USER BY EMAIL
// USER-#003

exports.findUserPerEmail = (email) => {

    return User.findOne({'local.email': email}).exec();

}

exports.findUserPerId = (id) => {

    return User.findById(id).exec();

}

// UPDATE USER
// USER-#004

exports.findUserAndUpdate = (id, user) => {

    return User.findByIdAndUpdate(id, {$set: user}, {runValidators: true});

}

// ALL USER
// USER-#005

exports.findAllUsers = () => {

    return User.find({}, '-local.password');

}

// FIND USER GOOGLEID
// USER-#006

exports.findUserPerGoogleId = (googleId) => {

    return User.findOne({'local.googleId': googleId}).exec();

}

// DELETE USER
// USER-#007

exports.deleteUsers = (id) => {

    return User.findByIdAndDelete(id).exec();

}