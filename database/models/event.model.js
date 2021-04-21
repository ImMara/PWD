const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventSchema = schema({

    name: {type: String, required: true, unique: true},

    date: {type: Date, required: true},

    address: {type: String},

    image: {type: String, default: 'events.jpg'}

});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;