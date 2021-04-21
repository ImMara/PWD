const fs = require("fs");
const path = require("path");
const {updateEvent} = require("../queries/events.queries");
const {deleteEvent} = require("../queries/events.queries");
const {findEvents} = require("../queries/events.queries");
const {createEvent} = require("../queries/events.queries");
const {findAllEvents} = require("../queries/events.queries");

exports.getEvents = async (req , res , next ) =>{
    try{
        const events = await findAllEvents();
        res.render('admin/events/index',{ events , currentUser:req.user})
    }catch (e) {
        next(e)
    }
}

exports.createEvents = async (req,res,next) => {
    try{
        const body = req.body;
        await createEvent({...body,image:req.file.filename })
        res.redirect('/admin/events')
    }catch (e) {
        next(e)
    }
}

exports.deleteEvents = async (req,res,next) => {
    const eventID = req.params.id;
    const event = await findEvents(eventID);
    const image = event.image;
    fs.unlink(path.join(__dirname,`../public/images/events/${image}`),(err => err&& console.error(err)))
    await deleteEvent(eventID);
    const events = await findAllEvents();
    res.render('admin/events/index',{ events , currentUser:req.user })
}
exports.getEvent = async (req,res,next) => {
    const eventID = req.params.id;
    try{
        const event = await findEvents(eventID)
        res.render('admin/events/event',{ event , currentUser: req.user })
    }catch (e) {
        next(e)
    }
}
exports.updateEvents = async (req , res , next ) =>{
    const eventID = req.params.id;
    try{
        const body = req.body;
        if(req.file){
            const event = await findEvents(eventID);
            const oldImage = event.image;
            fs.unlink(path.join(__dirname,`../public/images/events/${oldImage}`),(err => err&& console.error(err)))
            const upImage = req.file.filename;
            body.image = upImage;
        }
        await updateEvent(eventID,body);
        res.redirect('/admin/events/'+eventID);
    }catch (e) {
        next(e)
    }
}