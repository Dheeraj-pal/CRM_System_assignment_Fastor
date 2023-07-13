const mongoose = require("mongoose");

const enquirySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required."],
  },
  email: {
    type: String,
    required: [true, "Email is required."],
    lowercase: true,
  },
  courseInterested: {
    type: String,
    required: [true, "Course interested is required."],
  },
  claimedBy: {
    type: String,
    default: null,
  },
});

const EnquiryModel = mongoose.model("Enquiry", enquirySchema);

module.exports = {
  EnquiryModel,
};
