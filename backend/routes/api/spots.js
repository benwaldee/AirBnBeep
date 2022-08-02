// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, Image, sequelize } = require('../../db/models');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.get('/', async (req, res) => {
    const Spots = await Spot.findAll({

        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ],
                [sequelize.literal("Images.url"), "previewImage"]
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: Image,
                where: {
                    previewImage: true
                },
                attributes: []
            }
        ],
        group: ['Spot.id']
    })

    res.json({ Spots })
})

router.get('/current', async (req, res) => {
    const { token } = req.cookies;
    let decodedUser = jwt.decode(token)
    let userId = parseInt(decodedUser.data.id)

    console.log(typeof (userId))
    console.log(userId)

    const userSpot = await Spot.findAll({
        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
                ],
                [sequelize.literal("Images.url"), "previewImage"]
            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },
            {
                model: Image,
                where: {
                    previewImage: true
                },
                attributes: []
            }
        ],
        group: ['Spot.id'],
        where: { ownerId: userId },
    })

    res.json({ Spots: userSpot })

})

module.exports = router;
