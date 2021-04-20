const {findAllBlogs,createBlog} = require("../queries/blogs.queries");
const multer = require('multer');
const path = require("path");

const upload = multer({ storage : multer.diskStorage({
        destination : (req , file , callback) => {
            callback(null,path.join(__dirname,'../public/images/'))
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
        await createBlog({ ...body, author:req.user._id, created:Date.now() })
        res.redirect('/blogs')
    }catch (e){
        next(e)
    }
}
