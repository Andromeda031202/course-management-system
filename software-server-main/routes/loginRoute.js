const express = require("express");
const { User } = require("../models/user");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");

/**
 * @swagger
 * components:
 *   schemas:
 *     Login User:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: User email
 *         password:
 *           type: string
 *           description: User password
 *       example:
 *         email: user@gmail.com
 *         password: JaiHind$@123
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: login user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login User'
 *     responses:
 *       200:
 *         description: Login Successfull
 *       400:
 *         description: Wrong Login credentials
 *       500:
 *         description: Internal Server Error
 */

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) return res.status(400).send({ message: "Email not registered" });

    // const validPassword = await bcrypt.compare(
    // 	req.body.password,
    // 	user.password
    // );

    if (user.password !== req.body.password)
      return res.status(400).send({ message: "Incorrect Password" });

    if (!user.verified)
      return res.status(400).send({ message: "Email not Verified" });

    const payload = {
      email: user.email,
      id: user._id,
      role: user.userRole,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    let isAlumni = false;
    if (user.userRole === "alumni") isAlumni = true;

    return res.status(200).send({
      message: "Logged in Successfully",
      token: "Bearer " + token,
      isAlumni: isAlumni,
    });
  } catch (err) {
    return res.status(500).send({ message: `Internal Server Error: ${err}` });
  }
});

module.exports = router;
