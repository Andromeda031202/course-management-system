const mongoose = require("mongoose");

const enrollSchema = new mongoose.Schema({
  courseId: { type: String, required: true },
  teacherId: { type: String, required: true },
  studentId: { type: String, required: true },
  subjectName: { type: String, required: true },
});

const Enroll = mongoose.model("enroll", enrollSchema);

module.exports = { Enroll };
