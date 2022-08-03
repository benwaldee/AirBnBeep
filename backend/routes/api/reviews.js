// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, Image, sequelize } = require('../../db/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', async (req, res) => {
    const { token } = req.cookies;
    let decodedUser = jwt.decode(token)
    let userId = parseInt(decodedUser.data.id)

    const reviewBig = await Review.findAll({
        where: { userId: userId },
        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
            {
                model: Spot,
                attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]
            },
            { model: Image, as: "Images", attributes: ["id",] }
        ]
    })

})

module.exports = router;
