const Events = require('../database/models/event.model')

// FIND ALL EVENTS
// EVENTS-#001

exports.findAllEvents = () => {

    return Events.find();

}

// CREATE EVENT
// EVENTS-#002

exports.createEvent = (event) => {

    const newEvents = new Events(event);
    return newEvents.save();

}

// FIND ONE EVENT
// EVENTS-#003

exports.findEvents = (eventID) => {

    return Events.findById(eventID);

}

// DELETE EVENT
// EVENTS-#004

exports.deleteEvent = (eventID) => {

    return Events.findByIdAndDelete(eventID).exec();

}

// UPDATE EVENT
// EVENTS-#005

exports.updateEvent = (eventID, event) => {

    return Events.findByIdAndUpdate(eventID, {$set: event}, {runValidators: true});

}