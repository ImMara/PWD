const mongoose = require('mongoose');
const schema = mongoose.Schema;

const eventSchema = schema({

    name: {
        type: String,
        required: true,
        minLength: [3, 'name is too short'],
        maxLength: [50, 'name is too long'],
        unique: true
    },

    date: {type: Date, required: true},

    endDate: {type: Date, required: true},

    address: {type: String, minLength: [5, 'adress is way shorter then usual!']},

    image: {type: String, default: 'default.jpg'},

    link:{type: String , required: true}

});

const Event = mongoose.model('event', eventSchema);

module.exports = Event;