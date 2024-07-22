const express = require('express');
const router = express.Router();
const passport = require('passport');

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
 * /getuserfirstname:
 *   get:
 *     summary: login user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Get Login Username Successfull
 *       400:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */

router.get("/", passport.authenticate('jwt', { session : false }), ( req, res ) => {
	return res.status(200).send({
		success: true,
		user: req.user.firstName
	})
})

module.exports = router