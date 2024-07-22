const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  initials: { type: String, required: true },
  teacherId: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: Number, required: true },
  password: { type: String, required: true },
  isApproved: { type: Boolean, default: false },
});

const Teacher = mongoose.model("teacher", teacherSchema);

module.exports = { Teacher };
