require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Course } = require("../models/course");

router
  .post("/", async (req, res) => {
    try {
      const teacher = await new Course({
        ...req.body,
      }).save();
      return res.status(201).send({ success: true });
    } catch (error) {
      return res.status(400).send({ error: error });
    }
  })
  .get("/", async (req, res) => {
    try {
      const courses = await Course.find({});
      res.status(200).send({ courses: courses });
    } catch (err) {
      return res.status(400).send({ error: err });
    }
  });

// Add DELETE route for courses
router.delete("/:id", async (req, res) => {
  try {
    const courseId = req.params.id;
    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res
        .status(404)
        .send({ success: false, message: "Course not found" });
    }
    return res.status(200).send({ success: true });
  } catch (error) {
    return res.status(400).send({ success: false, error: error.message });
  }
});
module.exports = router;
