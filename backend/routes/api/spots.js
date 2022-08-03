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
    // const { token } = req.cookies
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
        order: [["id"]]
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
            if (image.previewImage === true || image.previewImage === 1) { Spots.previewImage = image.url }
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
        raw: true,
        order: [["id"]]
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
            if (image.previewImage === true || image.previewImage === 1) { Spots.previewImage = image.url }
        }
        if (!Spots.previewImage) { Spots.previewImage = null }

        spotArr.push(Spots)
    }



    res.json({ Spots: spotArr })
})




// ### Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images', async (req, res) => {
    const { token } = req.cookies
    let decodedUser = jwt.decode(token)
    let userId = parseInt(decodedUser.data.id)

    const { url } = req.body
    const spotId = req.params.spotId

    const idCheck = await Spot.findByPk(spotId)
    if (!idCheck) { throw new Error("Spot couldn't be found") }

    let newImage = await Image.create({
        url,
        spotId,
        userId,
    })

    newImage = newImage.toJSON()
    // newImage['imageableId'] = newImage['spotId']

    res.json({
        id: newImage.id,
        imageableId: newImage.spotId,
        url: newImage.url
    })

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

router.put('/:spotId', async (req, res) => {
    const { token } = req.cookies;
    let decodedUser = jwt.decode(token)
    let ownerId = parseInt(decodedUser.data.id)

    let spotId = req.params.spotId

    const idCheck = await Spot.findOne({
        where: { id: spotId },
        // raw: true
    })
    if (!idCheck) { throw new Error("Spot couldn't be found") }
    if (idCheck.ownerId !== ownerId) { throw new Error("Forbidden") }

    let { address, city, state, country, lat, lng, name, description, price } = req.body

    if (address) { idCheck.address = address }
    if (city) { idCheck.city = city }
    if (state) { idCheck.state = state }
    if (country) { idCheck.country = country }
    if (lat) { idCheck.lat = lat }
    if (lng) { idCheck.lng = lng }
    if (name) { idCheck.name = name }
    if (description) { idCheck.description = description }
    if (price) { idCheck.price = price }

    await idCheck.save()

    res.json(idCheck)
})

router.delete('/:spotId', async (req, res) => {
    const { token } = req.cookies;
    let decodedUser = jwt.decode(token)
    let ownerId = parseInt(decodedUser.data.id)

    let spotId = req.params.spotId

    const idCheck = await Spot.findOne({
        where: { id: spotId },
        // raw: true
    })
    if (!idCheck) { throw new Error("Spot couldn't be found") }
    if (idCheck.ownerId !== ownerId) { throw new Error("Forbidden") }

    await idCheck.destroy()

    res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
        })
})


module.exports = router;
