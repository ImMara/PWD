const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const {updateEvent, deleteEvent, findEvents, createEvent, findAllEvents} = require("../queries/events.queries");

// CEVENTS-#001

exports.getEvents = async (req, res, next) => {
    try {

        const events = await findAllEvents();
        res.render('admin/events/index', {events, currentUser: req.user})

    } catch (e) {

        next(e)

    }
}

// CEVENTS-#002

exports.createEvents = async (req, res, next) => {
    try {

        const body = req.body;

        if (req.file) {

            const {filename: image} = req.file;
            await sharp(req.file.path)
                .resize(800)
                .webp({quality: 90})
                .toFile(path.resolve(req.file.destination, "resized", image))
            fs.unlinkSync(req.file.path)
            await createEvent({...body, image: req.file.filename})

            const events = await findAllEvents();
            res.render("admin/events/index", {
                events,
                success: `successfully added ${body.name}`,
                currentUser: req.user
            })
        } else {
            await createEvent(body)
            const events = await findAllEvents();
            res.render("admin/events/index", {
                events,
                success: `successfully added ${body.name}`,
                currentUser: req.user
            })
        }

    } catch (e) {

        let errors;
        const events = await findAllEvents();
        if (req.file) {
            const {filename: image} = req.file;
            fs.unlinkSync(path.resolve(req.file.destination, "resized", image))
        }

        if (e.code) {
            errors = ['duplicate key']
        } else {
            errors = Object.keys(e.errors).map(key => e.errors[key].message)
        }
        res.status(400).render('admin/events/index', {events, errors, currentUser: req.user})

    }
}

// CEVENTS-#003

exports.deleteEvents = async (req, res, next) => {

    const eventID = req.params.id;
    const event = await findEvents(eventID);

    try {

        let name = event.name;

        const image = event.image;
        if (image !== 'default.jpg') {
            fs.unlink(path.join(__dirname, `../public/images/events/resized/${image}`), (err => err && console.error(err)))
        }

        await deleteEvent(eventID);

        const events = await findAllEvents();
        res.render('admin/events/index', {events, success: `successfully deleted ${name}`, currentUser: req.user})

    } catch (e) {

        next(e)

    }

}

// CEVENTS-#004

exports.getEvent = async (req, res, next) => {

    const eventID = req.params.id;

    try {

        const event = await findEvents(eventID)
        res.render('admin/events/event', {event, currentUser: req.user})

    } catch (e) {

        res.render('404', {currentUser: req.user})

    }
}

// CEVENTS-#005

exports.updateEvents = async (req, res, next) => {

    const eventID = req.params.id;

    try {

        const body = req.body;

        if (req.file) {

            const event = await findEvents(eventID);
            const oldImage = event.image;
            if (oldImage !== 'default.jpg') {
                fs.unlink(path.join(__dirname, `../public/images/events/resized/${oldImage}`), (err => err && console.error(err)))
            }
            const upImage = req.file.filename;
            body.image = upImage;

            const {filename: image} = req.file;
            await sharp(req.file.path)
                .resize(500)
                .webp({quality: 90})
                .toFile(path.resolve(req.file.destination, "resized", image))
            fs.unlinkSync(req.file.path);

            await updateEvent(eventID, body);
            const events = await findAllEvents();

            res.render('admin/events/index', {
                events,
                success: `successfully updated ${body.name}`,
                currentUser: req.user
            });

        } else {

            await updateEvent(eventID, body)
            const events = await findAllEvents();
            res.render("admin/events/index", {
                events,
                success: `successfully updated ${body.name}`,
                currentUser: req.user
            });

        }

    } catch (e) {

        let errors;
        const event = await findEvents(eventID);

        if (req.file) {
            const {filename: image} = req.file;
            fs.unlinkSync(path.resolve(req.file.destination, "resized", image))
        }

        if (e.code) {
            errors = ['duplicate key']
        } else {
            errors = Object.keys(e.errors).map(key => e.errors[key].message)
        }
        res.status(400).render('admin/events/event', {event, errors, currentUser: req.user})

    }
}