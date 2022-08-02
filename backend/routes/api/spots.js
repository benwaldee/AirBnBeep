// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, Image, sequelize } = require('../../db/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const router = express.Router();

// ### Get all Spots owned by the Current User
router.get('/current', restoreUser, async (req, res) => {
    const { user } = req
    //const {token} =req.cookies
    // let decodedUser = jwt.decode(token)
    // let userId = parseInt(decodedUser.data.id)

    const spotBad = await Spot.findAll({

        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
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
        raw: true,
        where: { ownerId: user.id },
    })

    let spotArr = []

    for (let spot of spotBad) {
        let Spots = {}
        Spots.id = spot.id
        Spots.address = spot.address
        Spots.city = spot.city
        Spots.ownerId = spot.ownerId
        Spots.state = spot.state
        Spots.country = spot.country
        Spots.lat = spot.lat
        Spots.lng = spot.lng
        Spots.name = spot.name
        Spots.description = spot.description
        Spots.price = spot.price
        Spots.createdAt = spot.createdAt
        Spots.updatedAt = spot.updatedAt
        Spots.avgRating = spot.avgRating

        let images = await Image.findAll({
            where: { spotId: spot.id },
            attributes: ["url", "previewImage"],
            raw: true
        })

        // console.log(images)

        for (let image of images) {
            if (image.previewImage === 1) { Spots.previewImage = image.url }
        }
        if (!Spots.previewImage) { Spots.previewImage = null }

        spotArr.push(Spots)
    }



    res.json({ Spots: spotArr })
    // res.json({ Spots: userSpot })

})

// ### Get details of a Spot from an id
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

    if (!spot) { throw new Error(`Spot couldn't be found`) }

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

//get all spots
router.get('/', async (req, res) => {
    const spotBad = await Spot.findAll({

        attributes: {
            include: [
                [
                    sequelize.fn("AVG", sequelize.col("Reviews.stars")),
                    "avgRating"
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
        raw: true
    })

    let spotArr = []

    for (let spot of spotBad) {
        let Spots = {}
        Spots.id = spot.id
        Spots.address = spot.address
        Spots.city = spot.city
        Spots.ownerId = spot.ownerId
        Spots.state = spot.state
        Spots.country = spot.country
        Spots.lat = spot.lat
        Spots.lng = spot.lng
        Spots.name = spot.name
        Spots.description = spot.description
        Spots.price = spot.price
        Spots.createdAt = spot.createdAt
        Spots.updatedAt = spot.updatedAt
        Spots.avgRating = spot.avgRating

        let images = await Image.findAll({
            where: { spotId: spot.id },
            attributes: ["url", "previewImage"],
            raw: true
        })

        // console.log(images)

        for (let image of images) {
            if (image.previewImage === 1) { Spots.previewImage = image.url }
        }
        if (!Spots.previewImage) { Spots.previewImage = null }

        spotArr.push(Spots)
    }



    res.json({ Spots: spotArr })
})

// ### Create a Spot
router.post('/', async (req, res) => {
    const { token } = req.cookies;
    let decodedUser = jwt.decode(token)
    let ownerId = parseInt(decodedUser.data.id)

    let { address, city, state, country, lat, lng, name, description, price } = req.body

    let newSpot = await Spot.create({
        ownerId,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    res.json(newSpot)

})


module.exports = router;
