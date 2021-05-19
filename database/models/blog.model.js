const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = schema({

    title: {
        type: String,
        required: true,
        unique: true,
        minLength: [3,'title is to short'],
        maxLength:[100,'title is to long'],
    },

    content: {
        type: String,
        minLength: [50, 'your post is to short'],
        required: [true, 'content is required'],

    },

    created: {
        type: Date,
        default: Date.now
    },

    image: {type: String, default: "default.jpg"},

    author: {type: schema.Types.ObjectId, ref: 'user', required: true, unique: false}

})

const Blog = mongoose.model('blog', blogSchema)
module.exports = Blog;