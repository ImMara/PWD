const Blog = require('../database/models/blog.model')

// ALL POST
// BLOG-#001

exports.findAllBlogs = () => {

    return Blog.find();

};

// CREATE 1 POST
// BLOG-#002

exports.createBlog = (blog) => {

    const newBlog = new Blog(blog);
    return newBlog.save();

};

// FIND 1 POST
// BLOG-#003

exports.findBlogs = (blogID) => {

    return Blog.findById(blogID);

}

// DELETE 1 POST
// BLOG-#004

exports.deleteBlog = (blogID) => {

    return Blog.findByIdAndDelete(blogID).exec();

};

//UPDATE 1 POST
// BLOG-#005

exports.updateBlog = (blogID, blog) => {

    return Blog.findByIdAndUpdate(blogID, {$set: blog}, {runValidators: true});

}