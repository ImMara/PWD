const SiteContents = require('../database/models/siteContent.model')

exports.findAllSiteContents = () => {

    return SiteContents.find();

}