const {findEvents} = require("../queries/events.queries");
const {findAllEvents} = require("../queries/events.queries");
const {findBlogs} = require("../queries/blogs.queries");
const {findAllBlogs} = require("../queries/blogs.queries");

// CAPI-#001

exports.getBlogs = async (req, res, next) => {
    try {
        const blogs = await findAllBlogs().populate('author')
        res.json({blogs})
    } catch (e) {
        next(e)
    }
}

// CAPI-#002

exports.getBlog = async (req, res, next) => {
    const blogID = req.params.id;
    try {
        const blog = await findBlogs(blogID).populate('author')
        res.json({blog})
    } catch (e) {
        next(e)
    }
}

// CAPI-#003

exports.getEvents = async (req, res, next) => {
    try {
        const events = await findAllEvents();
        res.json({events})
    } catch (e) {
        next(e)
    }
}

// CAPI-#004
exports.getEvent = async (req, res, next) => {
    const eventID = req.params.id;
    try {
        const event = await findEvents(eventID)
        res.json({event})
    } catch (e) {
        next(e)
    }
}