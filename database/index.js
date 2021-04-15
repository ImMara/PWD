const mongoose = require('mongoose');

exports.clientPromise = mongoose.connect(`mongodb+srv://${process.env.MONGO_LOGIN}:${process.env.MONGO_PASSWORD}@nogamenolife.eqdfq.mongodb.net/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true ,
}).then(() => console.log('CONNECT DB SUCCESS')).catch(err => console.log(err));