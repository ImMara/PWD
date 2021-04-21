const mongoose = require('mongoose');
const schema = mongoose.Schema;

const siteContentSchema = schema({

    title: {type: String, required: true, unique: true},

});

const SiteContent = mongoose.model('siteContent', siteContentSchema);
module.exports = SiteContent;