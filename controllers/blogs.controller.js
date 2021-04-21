const {findAllBlogs,createBlog,findBlogs,deleteBlog} = require("../queries/blogs.queries");
const multer = require('multer');
const path = require("path");
const fs = require('fs');
const {updateBlog} = require("../queries/blogs.queries");

exports.upload = multer({ storage : multer.diskStorage({
        destination : (req , file , callback) => {
            callback(null,path.join(__dirname,'../public/images/blogs/'))
        },
        filename: (req, file, callback) => {
            callback(null,`${ Date.now() }-${file.originalname}`)
        }
    })})

exports.getBlogs = async (req , res , next ) =>{
        try{
            const blogs = await findAllBlogs() .populate('author')
            res.render('admin/blogs/index',{ blogs , currentUser:req.user, })
        }catch (e) {
            next(e)
        }
    }

exports.createBlogs = async (req,res ,next) => {
    try{
        const body = req.body;
        console.log(body)
        console.log(2,req.file)
        await createBlog({ ...body,image:req.file.filename, author:req.user._id, created:Date.now() })
        res.redirect('/admin/blogs')
    }catch (e){
        next(e)
    }
}

exports.deleteBlogs = async (req , res , next) => {
    const blogID = req.params.id;
    const blog = await findBlogs(blogID);
    const image = blog.image;
    fs.unlink(path.join(__dirname,`../public/images/blogs/${image}`),(err => err && console.error(err)))
    await deleteBlog(blogID);
    const blogs = await findAllBlogs().populate('author')
    res.render('admin/blogs/index',{ blogs , currentUser:req.user })
}

exports.getBlog = async (req,res,next) => {
    const blogID = req.params.id;
    try{
       const blog = await findBlogs(blogID);
       res.render('admin/blogs/blog',{ blog , currentUser:req.user});
    }catch (e) {
       next(e)
    }
}

exports.updateBlogs = async (req,res,next) => {
    const blogID = req.params.id;
    try{
        const body = req.body;
        if(req.file){
            const blog = await findBlogs(blogID);
            const oldImage = blog.image;
            fs.unlink(path.join(__dirname,`../public/images/blogs/${oldImage}`),(err => err && console.error(err)))
            const upImage = req.file.filename;
            body.image = upImage;
        }
        await updateBlog(blogID,body);
        res.redirect('/admin/blogs/'+blogID);
    }catch (e) {
        const errors = Object.keys(e.errors).map( key => e.errors[key].message)
        const blog = await findBlogs(blogID);
        res.status(400).render('/blog-form', { errors,blog, isAuthenticated: req.isAuthenticated(), currentUser: req.user });
    }
}
