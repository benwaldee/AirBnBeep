// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, Image, sequelize } = require('../../db/models');
const jwt = require('jsonwebtoken');

const router = express.Router();

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

router.get('/:spotId', async (req, res) => {

    const spot = await Spot.findOne({
        attributes: {
            include: [
                [sequelize.fn("COUNT", sequelize.col("Reviews.id")),
                    "numReviews"],
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgStarRating"
                ],

            ]
        },
        include: [
            {
                model: Review,
                attributes: []
            },


        ],
        group: ['Spot.id'],
        where: { id: req.params.spotId },
        raw: true,
    })

    let Images = await Image.findAll({
        where: { spotId: req.params.spotId },
        attributes: ["id", ["spotId", "imageableId"], "url"],
        raw: true
    })
    let Owner = await User.findOne({
        include: [{ model: Spot, where: { id: req.params.spotId }, attributes: [] }],
        raw: true,
        attributes: ["id", "firstName", "lastName"]
    })

    spot.Images = Images
    spot.Owner = Owner

    res.json(spot)

})


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
