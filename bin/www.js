const fs = require('fs');
const url = require('url')
const https = require('https');
const http = require('http');
const app = require('../app');


const httpServer = http.createServer((req, res) => {
    res.writeHead(301, { Location: `https://${ req.headers.host }${ req.url }`});
    res.end();
})
httpServer.listen(80)



const httpsServer = https.createServer( {
    key:fs.readFileSync(env.key),
    cert:fs.readFileSync(env.cert)
},app)
httpsServer.listen(443)
