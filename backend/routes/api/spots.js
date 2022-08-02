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

module.exports = router;
