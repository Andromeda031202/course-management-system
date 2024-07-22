const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  rollNumber: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
});

const Student = mongoose.model("student", studentSchema);

module.exports = { Student };
