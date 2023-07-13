const mongoose = require("mongoose");

const counselorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const CounselorModel = mongoose.model("Counselor", counselorSchema);

module.exports = {
  CounselorModel,
};
