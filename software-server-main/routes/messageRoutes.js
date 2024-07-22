const express = require('express');
const router = express.Router();
const { User } = require('../models/user');
const passport = require('passport');
const { Message } = require('../models/message')

/**
 * @swagger
 * components:
 *   schemas:
 *     Message:
 *       type: object
 *       required:
 *         - message
 *       properties:
 *         message:
 *           type: string
 *           description: Message
 *       example:
 *         message: This is a message
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * /message:
 *   post:
 *     summary: Add a message
 *     tags: [Message]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: Fetched all gallery sucessfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */


router.post("/", passport.authenticate('jwt', {session : false}), async (req, res) => {
    try{
        const message = await new Message({
            userId: req.user._id,
            message: req.body.message
        }).save();
        return res.status(200).send({ message: "Message Added Successfully"})
    }
    catch(error){
        return res.status(500).send({ message: `Internal Server Error: ${error}`})
    }
})

module.exports = router