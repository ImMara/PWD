const {findAllBlogs} = require("../queries/blogs.queries");

exports.getBlogs = async (req , res , next ) =>{
        try{
            const blogs = await findAllBlogs() .populate('author')
            console.log(blogs)
            res.render('admin/blogs/index',{ blogs , currentUser:req.user})
        }catch (e) {
            next(e)
        }
    }
