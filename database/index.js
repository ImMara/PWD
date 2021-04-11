const mongoose = require('mongoose');

exports.clientPromise = mongoose.connect('mongodb+srv://admin:WHNzzWyJHlmUEv9c@nogamenolife.eqdfq.mongodb.net/nogame?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('CONNECT DB SUCCESS')).catch(err => console.log(err));