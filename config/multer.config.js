const multer = require('multer');
const path = require('path');

exports.uploadEvents = multer({
    storage: multer.diskStorage({

        destination: (req, file, callback) => {
            callback(null, path.join(__dirname, '../public/images/events/'))
        },

        filename: (req, file, callback) => {
            callback(null, `${Date.now()}-${file.originalname}`)
        }

    })
})

exports.uploadBlogs = multer({
    storage: multer.diskStorage({

        destination: (req, file, callback) => {
            callback(null, path.join(__dirname, '../public/images/blogs/'))
        },

        filename: (req, file, callback) => {
            callback(null, `${Date.now()}-${file.originalname}`)
        }

    })
})