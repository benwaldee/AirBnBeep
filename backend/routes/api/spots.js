// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, Image, sequelize } = require('../../db/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");

const router = express.Router();

// ### Get all Spots owned by the Current User
router.get('/current', restoreUser, async (req, res) => {
    const userId = req.user.id


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
        where: { ownerId: userId },
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
        if (isNaN(Number.parseFloat(spot.avgRating).toFixed(1))) { Spots.avgRating = null }
        else { Spots.avgRating = Number.parseFloat(spot.avgRating).toFixed(1) }

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
    if (!spot) {
        const error = new Error(`Spot couldn't be found`)
        error.status = "404"
        throw error;
    }
    //
    if (isNaN(Number.parseFloat(spot.avgRating).toFixed(1))) { spot.avgRating = null }
    else { spot.avgRating = Number.parseFloat(spot.avgRating).toFixed(1) }
    //

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
        if (isNaN(Number.parseFloat(spot.avgRating).toFixed(1))) { Spots.avgRating = null }
        else { Spots.avgRating = Number.parseFloat(spot.avgRating).toFixed(1) }

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
router.post('/:spotId/images', restoreUser, async (req, res) => {

    let userId = req.user.id

    const { url, previewImage } = req.body
    const spotId = req.params.spotId

    const idCheck = await Spot.findByPk(spotId)
    if (!idCheck) {
        const error = new Error(`Spot couldn't be found`)
        error.status = "404"
        throw error;
    }

    let newImage = await Image.create({
        url,
        previewImage,
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

//edit a spot
router.put('/:spotId', restoreUser, async (req, res) => {

    let ownerId = req.user.id

    let spotId = req.params.spotId

    const idCheck = await Spot.findOne({
        where: { id: spotId },
        // raw: true
    })
    if (!idCheck) {
        const error = new Error(`Spot couldn't be found`)
        error.status = "404"
        throw error;
    }
    if (idCheck.ownerId !== ownerId) {
        const error = new Error(`Forbidden`)
        error.status = "403"
        throw error;
    }

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

//delete a spot
router.delete('/:spotId', restoreUser, async (req, res) => {

    let ownerId = req.user.id

    let spotId = req.params.spotId

    const idCheck = await Spot.findOne({
        where: { id: spotId },
        // raw: true
    })
    if (!idCheck) {
        const error = new Error(`Spot couldn't be found`)
        error.status = "404"
        throw error;
    }
    if (idCheck.ownerId !== ownerId) {
        const error = new Error(`Forbidden`)
        error.status = "403"
        throw error;
    }

    await idCheck.destroy()

    res.json(
        {
            "message": "Successfully deleted",
            "statusCode": 200
        })
})

// Get all Reviews by a Spot's id

router.get('/:spotId/reviews', async (req, res) => {

    const checkSpot = await Spot.findByPk(req.params.spotId)
    if (!checkSpot) {
        const error = new Error(`Spot couldn't be found`)
        error.status = "404"
        throw error;
    }

    const Reviews = await Review.findAll({
        where: { spotId: req.params.spotId },
        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
            { model: Image, as: "Images", attributes: ["id", ["reviewId", "imageableId"], "url"] }
        ]
    })

    res.json({ Reviews })
})

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews', restoreUser, async (req, res) => {

    let userId = req.user.id

    let spotId = req.params.spotId
    const idCheck = await Spot.findByPk(spotId)
    if (!idCheck) {
        const error = new Error(`Spot couldn't be found`)
        error.status = "404"
        throw error;
    }

    //user cannot post two reviews to same spot

    const reviewCheck = await Review.findOne({
        where: {
            userId: userId,
            spotId: spotId
        }
    })
    if (reviewCheck) {
        const error = new Error('User already has a review for this spot')
        error.status = '403'
        throw error
    }

    const { review, stars } = req.body

    let newReview = await Review.create({
        userId,
        spotId,
        review,
        stars,
    })

    res.json(newReview)

})


//Get all Bookings for a Spot based on the Spot's id

router.get('/:spotId/bookings', async (req, res) => {
    const userId = req.user.id
    const spotId = req.params.spotId

    const idCheck = await Spot.findByPk(spotId)
    if (!idCheck) {
        const error = new Error(`Spot couldn't be found`)
        error.status = "404"
        throw error;
    }

    let ownerSpot = await Spot.findOne({
        where: {
            ownerId: userId,
            id: spotId

        },
        raw: true
    })

    if (ownerSpot) {
        let spotBookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            raw: true
        })

        let orderedBookings = []

        for (let booking of spotBookings) {

            let bookedUser = await User.findOne({
                where: { id: booking.userId },
                attributes: ["id", "firstName", "lastName"],

                raw: true
            })

            let bookingProper = {
                User: bookedUser,
                id: booking.id,
                spotId: booking.spotId,
                userId: booking.userId,
                startDate: booking.startDate,
                endDate: booking.endDate,
                createdAt: booking.createdAt,
                updatedAt: booking.updatedAt
            }

            orderedBookings.push(bookingProper)

        }

        res.json({ Bookings: orderedBookings })

    }

    if (!ownerSpot) {

        let spotBookings = await Booking.findAll({
            where: {
                spotId: spotId
            },
            attributes: ["spotId", "startDate", "endDate"],
            raw: true
        })

        res.json({ Bookings: spotBookings })

    }

})

module.exports = router;
