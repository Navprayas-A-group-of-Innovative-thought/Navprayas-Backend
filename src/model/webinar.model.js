import mongoose from "mongoose";


// Schema for Webinar
const webinarSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  speakers: {
    type: Array,
    required: true
  },
});

module.exports = mongoose.model("Webinar", webinarSchema);
