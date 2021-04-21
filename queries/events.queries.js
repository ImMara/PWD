const Events = require('../database/models/event.model')

exports.findAllEvents = () => {

    return Events.find();

}

exports.createEvent = (event) => {

    const newEvents = new Events(event);
    return newEvents.save();

}

exports.findEvents = (eventID) => {

    return Events.findById(eventID);

}

exports.deleteEvent = (eventID) => {

    return Events.findByIdAndDelete(eventID).exec();

}

exports.updateEvent = (eventID, event) => {

    return Events.findByIdAndUpdate(eventID, {$set: event}, {runValidators: true});

}