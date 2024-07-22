require("dotenv").config();
const express = require("express");
const router = express.Router();
const { Teacher } = require("../models/teacher");

router
  .post("/", async (req, res) => {
    try {
      const teacher = await new Teacher({
        ...req.body,
      }).save();
      return res.status(201).send({ success: true });
    } catch (error) {
      return res.status(400).send({ error: error });
    }
  })
  .post("/login", async (req, res) => {
    try {
      console.log(req.body);
      const teacher = await Teacher.findOne({
        userName: req.body.userName,
        password: req.body.password,
      });
      if (!teacher) return res.status(200).send({ success: false });
      if (teacher.password === req.body.password)
        return res
          .status(200)
          .send({ success: true, userType: "Teacher", id: teacher._id });

      return res.status(200).send({ success: false });
    } catch (err) {
      return res.status(400).send({ error: err });
    }
  })
  .get("/", async (req, res) => {
    const teacher = await Teacher.find({});
    res.status(200).send({ teacher: teacher });
  });

module.exports = router;
