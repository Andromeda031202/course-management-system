const express = require('express');
const { User } = require('../models/user');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { Event } = require('../models/event');
const passport = require('passport');
const { Gallery } = require('../models/gallery');

/**
 * @swagger
 * components:
 *   schemas:
 *     Gallery:
 *       type: object
 *       required:
 *         - title
 *         - imageUrl
 *         - description
 *         - type
 *       properties:
 *         title:
 *           type: string
 *           description: Image Title
 *         imageUrl:
 *           type: string
 *           description: Image Url
 *         type:
 *           type: string
 *           description: Image Type
 *       example:
 *         title: DJ Night
 *         imageUrl: https://res.cloudinary.com/dwunsncqo/image/upload/v1683547333/cld-sample-3.jpg
 *         type: Featured
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
 * /gallery:
 *   get:
 *     summary: Get all Gallery Image
 *     tags: [Gallery]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Fetched all gallery sucessfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

router.get("/", passport.authenticate('jwt', {session : false}), async (req, res) => {
    try{
        const gallery = await Gallery.find({});
        return res.status(200).send({ gallery: gallery})
    }catch(err) {
        return res.status(500).send({message: `Internal Server Error: ${err}`})
    }
})



router.post("/", async (req, res) => {
    try{
        const gallery = await new Gallery({...req.body}).save();
        return res.status(200).send({ message: "Gallery Image Added Successfully"})
    }
    catch(error){
        return res.status(500).send({ message: `Internal Server Error: ${error}`})
    }
})

module.exports = router