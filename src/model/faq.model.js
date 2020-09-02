import mongoose from 'mongoose'
var Schema =mongoose.Schema;

// FAQSchema Starst here....................................
const faqSchema = new Schema({
    question: {
        type:String,
        required:true
    },
    answer: {
        type:String,
        required:true
    }
}, {
    timestamps:true
})
//FAQSchema ends here...........................................

var faqs = mongoose.model('faqs',faqSchema)
module.exports = faqs;                                          //export faq Model
