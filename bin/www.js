const fs = require('fs');
const https = require('https');
const http = require('http');
const app = require('../app');
const env = require(`../env/${ process.env.NODE_ENV }`)

const httpServer = http.createServer(app).listen();

const server = https.createServer({
    key: fs.readFileSync(path.join(__dirname,'../ssl/local.key')),
    cert: fs.readFileSync(path.join(__dirname,'../ssl/local.crt'))
},app).listen(443);