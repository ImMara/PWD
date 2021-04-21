const {findAllBlogs,createBlog,deleteBlog} = require("../queries/blogs.queries");
const multer = require('multer');
const path = require("path");

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
    await deleteBlog(blogID);
    const blogs = await findAllBlogs().populate('author')
    res.render('admin/blogs/index',{ blogs , currentUser:req.user })
}
