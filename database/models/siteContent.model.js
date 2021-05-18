const mongoose = require('mongoose');
const schema = mongoose.Schema;

const siteContentSchema = schema({

    title: {type: String, required: true, unique: true},
    description:{type: String , required:true},
    promoTitle:{type:String , required:true},
    promoDesc:{type:String , required:true},
    promoImg:{type:String, required:true}

});

const SiteContent = mongoose.model('siteContent', siteContentSchema);
module.exports = SiteContent;