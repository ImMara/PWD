const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = schema({

    username: {type: String, required: true, unique: true},

    image: {type: String, default: 'default.png'},

    local: {
        email: {type: String, required: true, unique: true},
        password: {type: String},
        googleId: {type: String}
    },
    role: {type: String, default: "ROLE_USER"}

});

userSchema.statics.hashPassword = (password) => {

    return bcrypt.hash(password, 12);

}

userSchema.methods.comparePassword = function (password) {

    return bcrypt.compare(password, this.local.password)

}

const User = mongoose.model('user', userSchema)

module.exports = User;