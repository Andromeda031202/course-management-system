const { User, validate } = require("../models/user");
const Token = require("../models/token");
const mongoose = require('mongoose');
require("dotenv").config();
const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendVerifymail = require("../utilities/sendMail");
const { verifyEmailTemplate, congratesMail } = require("../emailTemplates");
const sendMail = require("../utilities/sendMail");
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - firstName
 *         - lastName
 *         - gender
 *         - email
 *         - contactNumber
 *         - userRole
 *         - department
 *         - rollNo
 *         - year
 *         - batch
 *         - companyName
 *         - instituteName
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the each user
 *         firstName:
 *           type: string
 *           description: User First Name
 *         gender:
 *           type: string
 *           description: User Gender
 *         email:
 *           type: string
 *           description: User Authorised Email
 *         contactNumber:
 *           type: string
 *           description: User Contact Number
 *         userRole:
 *           type: string
 *           description: User Role
 *         department:
 *           type: string
 *           description: User Department
 *         rollNo:
 *           type: string
 *           description: User Roll No
 *         year:
 *           type: Number
 *           description: User year in College
 *         batch:
 *           type: string
 *           description: User batch
 *         companyName:
 *           type: string
 *           description: User Company Name
 *         instituteName:
 *           type: string
 *           description: User Institute Name
 *         password:
 *           type: string
 *           description: User password
 *       example:
 *         firstName: Jon
 *         lastName: Snow
 *         gender: Male
 *         email: jonsnow@gmail.com
 *         contactNumber: "9123123123"
 *         userRole: UITAN
 *         department: IT
 *         rollNo: "20203005"
 *         year: 3
 *         batch: 2020-2024
 *         companyName: ""
 *         instituteName: University Institute of Technology, The University of Burdwan
 *         password: Kolk@t@2023
 */

router.post("/", async (req, res) => {
    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        let user = await User.findOne({ email: req.body.email });
        if (user)
            return res
                .status(208)
                .send({ message: "User with given email already Exist!" });
        // const salt = await bcrypt.genSalt(Number(process.env.SALT));
        // const hashPassword = await bcrypt.hash(req.body.password, salt);

        user = await new User({ ...req.body}).save();
        const token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();

        //const url = `https://${hostname}/register/${user.id}/verify/${token.token}`;
        const body = verifyEmailTemplate(user.firstName, user.id, token.token)
        await sendVerifymail(user.email, "Verify Email", body);
        return res
            .status(201)
            .send({ message: "An Email sent to your account please verify" });
    }
    catch (err) {
        return res.status(500).send({ message: `Internal Server Error: ${err}` })
    }
})

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register new User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: An Email sent to your account please verify
 *       208:
 *         description: User with given email already Exist!
 *       400:
 *         description: Wrong User Data format
 *       500:
 *         description: Internal Server Error
 */

router.get("/:id/verify/:token/", async (req, res) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.id))
            return res.status(400).send({ message: "Invalid Link" });

        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(400).send({ message: "Invalid link" });

        const token = await Token.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if (!token) return res.status(400).send({ message: "Invalid link" });

        await Token.deleteOne({
            userId: user._id,
            token: req.params.token,
        });
        const body = congratesMail(user.firstName);
        //console.log(congratsMail)
        await User.updateOne({ _id: user._id }, { verified: true })
            .then(
                async(result) => {
                    await sendMail(user.email, "Congrats you have Successfully Registered for Waltz 2023", body)
                    res.status(200).send({ message: "Email verified successfully" })
                }
            )
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: `Internal Server Error${error}` });
    }
});

/**
 * @swagger
 * /register/{id}/verify/{token}:
 *   get:
 *     summary: Verify user by email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User Id
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Email validation token
 *     responses:
 *       200:
 *         description: Email verified successfully
 *       400:
 *         description: Invalid Link
 *       500:
 *         description: Internal Server Error
 */

module.exports = router
