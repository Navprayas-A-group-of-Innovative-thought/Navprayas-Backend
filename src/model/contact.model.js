import mongoose from "mongoose";
import "mongoose-type-email";
import Email from "mongoose-type-email";

// Schema for contact form

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: Email,
    required: true,
    trim: true,
    unique: false,
  },
  contact: {
    type: Number,
  },
  subject: {
    type: String,
    required: true,
    maxlength: 60,
  },
  body: {
    type: String,
    required: true,
  },
  isResolved: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Contact Form", contactSchema);
