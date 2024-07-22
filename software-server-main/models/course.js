const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  teacherId: { type: String, required: true },
  subjectCode: { type: String, required: true },
  subjectName: { type: String, required: true },
  courseSyllabus: { type: String, required: true },
});

const Course = mongoose.model("course", courseSchema);

module.exports = { Course };
