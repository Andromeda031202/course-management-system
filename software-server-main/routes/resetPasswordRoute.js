const { User } = require("../models/user");
const ResetPasswordToken = require("../models/resetPasswordToken");
const mongoose = require('mongoose');
require("dotenv").config();
const Joi = require("joi");
const express = require('express');
const router = express.Router();
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const sendMail = require("../utilities/sendMail");
const {resetPasswordVerifyMail, passwordSecurityAlert} = require("../emailTemplates");
const passwordComplexity = require("joi-password-complexity");

/**
 * @swagger
 * components:
 *   schemas:
 *     Reset Password:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         password:
 *           type: string
 *           description: Password
 *       example:
 *         password: JaiHind$@123
 */

/**
 * @swagger
 * /reset-password/{email}:
 *   get:
 *     summary: Verify valid email
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: email
 *         schema:
 *           type: string
 *         required: true
 *         description: Email
 *     responses:
 *       200:
 *         description: Server Up, and proccessed email
 *       500:
 *         description: Internal Server Error
 */

router.get("/:email", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email});
        if(!user)
        return res.status(200).send({message: "Email not registered", _idFound: false});
        if(!user.verified)
        return res.status(200).send({message: "Email not Verified", _idFound: false});
        const token = await new ResetPasswordToken({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();
        const body = resetPasswordVerifyMail(user.firstName, user._id, token.token )
        await sendMail(user.email, "Reset Password", body);
        return res.status(200).send({_idFound: true, _id: user._id});
    }
    catch (err) {
        res.status(500).send({ message: `Internal Server Error: ${err}` })
    }
})

/**
 * @swagger
 * /reset-password/{userId}/reset-password/{token}:
 *   put:
 *     summary: Reset password
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: UserId
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: reset password token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reset Password'
 *     responses:
 *       200:
 *         description: Server Up and password proccessed
 *       400:
 *         description: Client Error
 *       500:
 *         description: Internal Server Error
 */

router.put("/:id/reset-password/:token", async (req, res) => {
    try {
        if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).send({ message: "Invalid Link" });

        const user = await User.findOne({ _id: req.params.id });
        if(!user) return res.status(400).send({ message: "Invalid link" });

        const token = await ResetPasswordToken.findOne({
            userId: user._id,
            token: req.params.token,
        });

        if(!token) return res.status(400).send({ message: "Invalid link" });

        const pass = {password: req.body.password}
        const { error } = validate(pass);
        if(error)
        return res.status(400).send({ message: error.details[0].message });
        let body=passwordSecurityAlert(user.firstName)
        await sendMail(user.email, "Security Alert", body);
        // const salt = await bcrypt.genSalt(Number(process.env.SALT));
		// const hashPassword = await bcrypt.hash(req.body.password, salt);
        await User.updateOne({ _id: user._id },{ password: req.body.password });
        await ResetPasswordToken.deleteOne({
            userId: user._id,
            token: req.params.token,
        });
        return res.status(200).send({ message: "Password Updated Successfully" });
    }
    catch(error) {
        return res.status(500).send({ message: `Internal Server Error: ${error}` });
    }
})

const validate = (data) => {
	const schema = Joi.object({
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router
