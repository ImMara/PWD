const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const {updateEvent, deleteEvent, findEvents, createEvent, findAllEvents} = require("../queries/events.queries");

exports.getEvents = async (req, res, next) => {
    try {

        const events = await findAllEvents();
        res.render('admin/events/index', {events, currentUser: req.user})

    } catch (e) {

        next(e)

    }
}

exports.createEvents = async (req, res, next) => {
    try {

        const body = req.body;

        if(req.file){
            const {filename: image} = req.file;
            await sharp(req.file.path)
                .resize(800)
                .webp({quality: 90})
                .toFile(path.resolve(req.file.destination, "resized", image))
            fs.unlinkSync(req.file.path)
            await createEvent({...body, image: req.file.filename})
            const events = await findAllEvents();
            res.render("admin/events/index",{ events, success:`successfully added ${body.name}`, currentUser: req.user})
        }else{
            await createEvent(body)
            const events = await findAllEvents();
            res.render("admin/events/index",{ events, success:`successfully added ${body.name}`, currentUser: req.user})
        }



    } catch (e) {
        console.log(0,e)
        console.log(1,e.code)
        let errors;
        const events = await findAllEvents();

        if(e.code){
            errors= ['duplicate key']
        }else{
            errors = Object.keys(e.errors).map(key => e.errors[key].message)
        }
        res.status(400).render('admin/events/index',{events,errors, currentUser:req.user})

    }
}

exports.deleteEvents = async (req, res, next) => {

    const eventID = req.params.id;
    const event = await findEvents(eventID);

    let name = event.name;

    const image = event.image;
    fs.unlink(path.join(__dirname, `../public/images/events/resized/${image}`), (err => err && console.error(err)))

    await deleteEvent(eventID);

    const events = await findAllEvents();
    res.render('admin/events/index', {events, success:`successfully deleted ${name}`, currentUser: req.user})

}

exports.getEvent = async (req, res, next) => {

    const eventID = req.params.id;

    try {

        const event = await findEvents(eventID)
        res.render('admin/events/event', {event, currentUser: req.user})

    } catch (e) {

        next(e)

    }
}

exports.updateEvents = async (req, res, next) => {

    const eventID = req.params.id;

    try {

        const body = req.body;

        if (req.file) {

            const event = await findEvents(eventID);
            const oldImage = event.image;
            fs.unlink(path.join(__dirname, `../public/images/events/resized/${oldImage}`), (err => err && console.error(err)))

            const upImage = req.file.filename;
            body.image = upImage;

            const {filename: image} = req.file;
            await sharp(req.file.path)
                .resize(500)
                .webp({quality: 90})
                .toFile(path.resolve(req.file.destination, "resized", image))
            fs.unlinkSync(req.file.path);
        }

        await updateEvent(eventID, body);
        res.redirect('/admin/events/' + eventID);

    } catch (e) {

        next(e)

    }
}