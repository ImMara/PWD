const mongoose = require('mongoose');
const schema = mongoose.Schema;

const contentSchema = schema({
    title:{type:String,required:true, unique:true},
});

const Content = mongoose.model('content',contentSchema);
module.exports = Content;