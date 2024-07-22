require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Enroll } = require("../models/enroll");

router
  .post("/", async (req, res) => {
    try {
      const enroll = await Enroll.findOne({
        courseId: req.body.courseId,
        studentId: req.body.studentId,
      });
      if (enroll) return res.status(200).send({ success: false });
      enroll = await new Enroll({
        ...req.body,
      }).save();
      return res.status(201).send({ success: true });
    } catch (error) {
      return res.status(400).send({ error: error });
    }
  })
  .get("/allenrollbystudent/:id", async (req, res) => {
    try {
      const enroll = await Enroll.find({ studentId: req.params.id });
      res.status(200).send({ enroll: enroll });
    } catch (err) {
      return res.status(400).send({ error: err });
    }
  })
  .get("/allenrollbyteacher/:id", async (req, res) => {
    try {
      const enroll = await Enroll.find({ teacherId: req.params.id });
      res.status(200).send({ enroll: enroll });
    } catch (err) {
      return res.status(400).send({ error: err });
    }
  });

module.exports = router;
