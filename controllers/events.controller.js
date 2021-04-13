const {findAllEvents} = require("../queries/events.queries");

exports.getEvents = async (req , res , next ) =>{
    try{
        const events = await findAllEvents();
        res.render('admin/events/index',{ events , currentUser:req.user})
    }catch (e) {
        next(e)
    }
}