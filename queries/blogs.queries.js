const blog = require('../database/models/blog.model')

exports.findAllBlogs= () =>{
    return blog.find();
}