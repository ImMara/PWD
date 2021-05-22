const SiteContents = require('../database/models/siteContent.model')

exports.findAllSiteContents = () => {

    return SiteContents.find();

}

exports.updateSiteContents = (ID, body) => {
    return SiteContents.findByIdAndUpdate(ID, {$set: body}, {runValidators: true})
}

exports.findContents = (id) => {
    return SiteContents.findById(id)
}