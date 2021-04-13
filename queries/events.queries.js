const Events = require('../database/models/event.model')

exports.findAllEvents = () =>{
    return Events.find();
}