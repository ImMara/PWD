const {findAllBlogs, createBlog, findBlogs, deleteBlog, updateBlog} = require("../queries/blogs.queries");
const path = require("path");
const sharp = require('sharp');
const fs = require('fs');


exports.getBlogs = async (req, res, next) => {
    try {

        const blogs = await findAllBlogs().populate('author')
        res.render('admin/blogs/index', {blogs, currentUser: req.user,})

    } catch (e) {

        next(e)

    }
}

exports.createBlogs = async (req, res, next) => {
    try {

        const body = req.body;

        const {filename: image} = req.file;
        await sharp(req.file.path)
            .resize(800)
            .webp({quality: 90})
            .toFile(path.resolve(req.file.destination, "resized", image))
        fs.unlinkSync(req.file.path);

        await createBlog({...body, image: req.file.filename, author: req.user._id, created: Date.now()})
        res.redirect('/admin/blogs')

    } catch (e) {

        next(e)

    }
}

exports.deleteBlogs = async (req, res, next) => {

    const blogID = req.params.id;
    const blog = await findBlogs(blogID);

    const image = blog.image;
    fs.unlink(path.join(__dirname, `../public/images/blogs/resized/${image}`), (err => err && console.error(err)))
    await deleteBlog(blogID);

    const blogs = await findAllBlogs().populate('author')
    res.render('admin/blogs/index', {blogs, currentUser: req.user})

}

exports.getBlog = async (req, res, next) => {

    const blogID = req.params.id;

    try {

        const blog = await findBlogs(blogID).populate('author');
        res.render('admin/blogs/blog', {blog, currentUser: req.user});

    } catch (e) {

        next(e)

    }
}

exports.updateBlogs = async (req, res, next) => {

    const blogID = req.params.id;

    try {

        const body = req.body;

        if (req.file) {
            const blog = await findBlogs(blogID);
            const oldImage = blog.image;
            fs.unlink(path.join(__dirname, `../public/images/blogs/resized/${oldImage}`), (err => err && console.error(err)))
            const upImage = req.file.filename;
            body.image = upImage;
        }

        const {filename: image} = req.file;
        await sharp(req.file.path)
            .resize(800)
            .webp({quality: 90})
            .toFile(path.resolve(req.file.destination, "resized", image))
        fs.unlinkSync(req.file.path);

        await updateBlog(blogID, body);
        res.redirect('/admin/blogs/' + blogID);

    } catch (e) {

        const errors = Object.keys(e.errors).map(key => e.errors[key].message)
        const blog = await findBlogs(blogID);
        res.status(400).render('/blog-form', {
            errors,
            blog,
            isAuthenticated: req.isAuthenticated(),
            currentUser: req.user
        });

    }
}
