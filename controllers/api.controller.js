const {findEvents} = require("../queries/events.queries");
const {findAllEvents} = require("../queries/events.queries");
const {findAllSiteContents} = require("../queries/siteContents.queries");
const {findBlogs} = require("../queries/blogs.queries");
const {findAllBlogs} = require("../queries/blogs.queries");

exports.getContent = async ( req, res, next) =>{
    try{
        const content = await findAllSiteContents();
        res.json({content})
    }catch (e) {
        next(e)
    }
}

exports.getBlogs = async ( req, res, next) =>{
    try{
        const blogs = await findAllBlogs().populate('author')
        res.json({blogs})
    }catch (e) {
        next(e)
    }
}

exports.getBlog = async (req, res, next) =>{
    const blogID = req.params.id;
    try{
        const blog = await findBlogs(blogID).populate('author')
        res.json({blog})
    }catch (e) {
        next(e)
    }
}

exports.getEvents = async (req, res, next) =>{
    try{
        const events = await findAllEvents();
        res.json({events})
    }catch (e) {
        next(e)
    }
}

exports.getEvent = async (req,res,next) =>{
    const eventID = req.params.id;
    try{
        const event = await findEvents(eventID)
        res.json({event})
    }catch (e){
        next(e)
    }
}