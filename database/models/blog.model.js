const mongoose = require('mongoose');
const schema = mongoose.Schema;

const blogSchema = schema({
    content:{ type:String ,
        maxLength:[140 , 'message trop long'],
        minLength:[1 , 'message trop court'] ,
        required: [true , 'Champ requis']
    },
    image:{type:String , default:"events.jpg"},
    author:{type:schema.Types.ObjectId,ref:'user', required:true }
})

const Blog = mongoose.model('blog',blogSchema)
module.exports = Blog;