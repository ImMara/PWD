const path = require("path");
const sharp = require('sharp');
const fs = require('fs');
const {updateSiteContents} = require("../queries/siteContents.queries");
const {findAllSiteContents} = require("../queries/siteContents.queries");


exports.getContents = async (req, res, next) => {
    try {

        const site = await findAllSiteContents();
        res.render('admin/siteContents/index', {site, currentUser: req.user})

    } catch (e) {

        next(e)

    }
}
exports.updateContents = async (req,res,next) =>{

    const id = req.params.id;

    try{

        const body = req.body;

        if (req.file) {

            const site = await findAllSiteContents();
            const oldImage = site.image;

            if(oldImage!=='default.jpg'){
                fs.unlink(path.join(__dirname, `../public/images/promo/resized/${oldImage}`),
                    (err => err && console.error(err)))
            }
            const upImage = req.file.filename;
            body.image = upImage;

            const {filename: image} = req.file;
            await sharp(req.file.path)
                .resize(800)
                .webp({quality: 90})
                .toFile(path.resolve(req.file.destination, "resized", image))
            fs.unlinkSync(req.file.path);

            await updateSiteContents(id,body);
            res.render('admin/siteContents/index', {
                site,
                success: `successfully updated`,
                currentUser: req.user
            });

        } else {

            await updateSiteContents(id,body);
            const site = await findAllSiteContents();
            res.render('admin/siteContents/index', {
                site,
                success: `successfully updated`,
                currentUser: req.user
            });

        }
    }catch (e) {

        let errors;
        const site = await findAllSiteContents();

        if(req.file){
            const {filename: image} = req.file;
            fs.unlinkSync(path.resolve(req.file.destination, "resized", image))
        }

        if (e.code) {
            errors = ['duplicate key']
        } else {
            errors = Object.keys(e.errors).map(key => e.errors[key].message)
        }

        res.status(400).render('admin/siteContents/index', {site, errors, currentUser: req.user})

    }
}