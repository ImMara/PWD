const app = require('../app');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const {clientPromise} = require('../database');

app.use(session({

    secret: '|o45D*CmZI^vd^B.QgUcBd&%k_MsJ8',
    resave: false,
    saveUninitialized: false,

    cookie: {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 24 * 14
    },

    store: new MongoStore({
        mongoUrl: `mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@nogamenolife.eqdfq.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`,
        autoRemove: true,
        ttl: 60 * 60 * 24 * 14,
    }),

}));