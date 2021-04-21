const {findAllSiteContents} = require("../queries/siteContents.queries");


exports.getContents = async (req, res, next) => {
    try {

        const site = await findAllSiteContents();
        res.render('admin/siteContents/index', {site, currentUser: req.user})

    } catch (e) {

        next(e)

    }
}