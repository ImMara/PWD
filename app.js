// APPJS-#01
// ENV VARIABLE
const https = require('https');
const http = require("http");

// ENV MODULE (.env)

require('dotenv').config()

// APPJS-#02
// MODULE SERVER

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const index = require('./routes');
const errorHandler = require('errorhandler');

// APPJS-#03
// CONNECT DB

require('./database');

// APPJS-#04
// SERVER EXPRESS APP

const app = express();
exports.app = app;

// APPJS-#05
// VIEWS SETUP

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// APPJS-#06
// IMPORT CONFIG

require('./config/session.config');
require('./config/passport.config');

// APPJS-#07
// BEHAVIOR EXPRESS

app.use(morgan('short'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(index);

// APPJS-#08
// ERROR HANDLER PROD ONLY

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

// APPJS-#09
// CREATE SERVER

http.createServer(app).listen(3001)

// http.createServer((req, res) => {
//   res.writeHead('301', { Location: `https://${ req.headers.host }${ req.url }` })
//   res.end();
// }).listen();
// https.createServer(app).listen()
