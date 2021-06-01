const path = require('path')

module.exports = {
    cert:path.join(__dirname,'../ssl/local.crt'),
    key:path.join(__dirname,'../ssl/local.key')
}