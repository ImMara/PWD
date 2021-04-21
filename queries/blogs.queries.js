const Blog = require('../database/models/blog.model')

exports.findAllBlogs= () =>{
    return Blog.find();
}
exports.createBlog = (blog)=>{
    const newBlog = new Blog(blog);
    return newBlog.save();
}
exports.findBlogs = (blogID) =>{
    return Blog.findById(blogID)
}
exports.deleteBlog = (blogID) =>{
  return Blog.findByIdAndDelete(blogID).exec();
};