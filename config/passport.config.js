const {app} = require('../app');
const passport = require('passport');
const User = require("../database/models/user.model");
const {findUserPerGoogleId} = require("../queries/users.queries");
const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const {findUserPerEmail, findUserPerId} = require('../queries/users.queries')

app.use(passport.initialize());
app.use(passport.session());

// NUM SESSION
// PASSPORT-#001

passport.serializeUser((user, done) => {

    done(null, user._id);

});

// NUM SESSION
// PASSPORT-#002

passport.deserializeUser(async (id, done) => {
    try {

        const user = await findUserPerId(id)
        done(null, user)

    } catch (e) {

        done(e);

    }
})

passport.use('local', new localStrategy({

    usernameField: 'email'

}, async (email, password, done) => {
    try {

        const user = await findUserPerEmail(email);

        if (user) {

            const match = await user.comparePassword(password);

            if (match) {

                done(null, user)

            } else {

                done(null, false, {message: 'wrong password'})

            }

        } else {

            done(null, false, {message: 'User not found'})

        }
    } catch (e) {

        done(e);

    }
}))

passport.use('google', new GoogleStrategy({
    clientID: '256667637100-qbqtpq07imdio8mbmbr4c53ngrflpp77.apps.googleusercontent.com',
    clientSecret: 'Vm7ZmAll8j190rGAzCCj6JbC',
    callbackURL: '/google/cb'
}, async (accessToken, refreshToken, profile, done) => {
    try {
        const user = await findUserPerGoogleId(profile.id);
        if (user) {
            done(null, user);
        } else {
            const newUser = new User({
                username: profile.displayName,
                local: {
                    googleId: profile.id,
                    email: profile.emails[0].value
                },
                role: 'ROLE_USER'
            })
            const savedUser = await newUser.save();
            done(null, savedUser);
        }
    } catch (e) {
        done(e);
    }
}));