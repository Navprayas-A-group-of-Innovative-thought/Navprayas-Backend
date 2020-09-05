import mongoose from 'mongoose'
var Schema =mongoose.Schema;

// eventScheduleSchema Starst here....................................
const eventScheduleSchema = new Schema({
    date: {
        type:Date,
        required:true
    },
    eventName: {
        type:String,
        required:true
    }
}, {
    timestamps:true
})
//eventScheduleSchema ends here...........................................

var eventSchedule = mongoose.model('eventSchedule',eventScheduleSchema)
module.exports = eventSchedule;                                          //export faq Model
