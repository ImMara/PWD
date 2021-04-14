const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = schema({
    title:{type:String ,required:true,unique:true},
    content:{ type:String ,
        minLength:[1 , 'message trop court'] ,
        required: [true , 'Champ requis']
    },
    created: {
        type: Date,
        default: Date.now
    },
    image:{type:String , default:"defaultBlog.jpg"},
    author:{type:schema.Types.ObjectId,ref:'user', required:true , unique:false }
})

const Blog = mongoose.model('blog',blogSchema)
module.exports = Blog;