const https = require('https');
const http = require("http");
const env = require(`./env/${ process.env.NODE_ENV }`)

require('dotenv').config()

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const index = require('./routes');
const errorHandler = require('errorhandler');
require('./database');

const app = express();
exports.app = app;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

require('./config/session.config');
require('./config/passport.config');
const fs = require("fs");

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(index);

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler())
} else {
    app.use((err, req, res, next) => {
        const code = err.code || 500;
        res.status(code).json({
            code: code,
            message: code === 500 ? null : err.message
        });
    })
}
http.createServer(app).listen()
// https.createServer({
//     key:fs.readFileSync(env.key),
//     cert:fs.readFileSync(env.cert)
// },app).listen(443)
