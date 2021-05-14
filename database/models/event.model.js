const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventSchema = schema({

    name: {type: String, required: true, minLength: [10,'name is too short'], maxLength:[20,'name is too long'], unique: true},

    date: {type: Date, required: true},

    address: {type: String , minLength:[5,'adress is way shorter then usual!']},

    image: {type: String, default: 'events.jpg'}

});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;