require("dotenv").config();
const express = require("express");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    console.log("ggsdcv", req.body);
    if (req.body.username === "admin" && req.body.password === "12345")
      return res.status(201).send({ success: true, userType: "Admin" });
    else return res.status(201).send({ success: false });
  } catch (err) {
    return res.status(400).send({ error: err });
  }
});

module.exports = router;
