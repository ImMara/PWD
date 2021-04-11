const { app } = require('../app');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { clientPromise } = require('../database');

app.use(session({
    secret: 'je suis un secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 14
    },
    store: new MongoStore({
        mongoUrl:'mongodb+srv://admin:WHNzzWyJHlmUEv9c@nogamenolife.eqdfq.mongodb.net/nogame?retryWrites=true&w=majority',
        ttl: 60 * 60 * 24 * 14,
    }),
}));