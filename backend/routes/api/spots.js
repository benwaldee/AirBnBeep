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
    // console.log(spot)

    //
    if (isNaN(Number.parseFloat(spot.avgStarRating).toFixed(1))) { spot.avgStarRating = null }
    else { spot.avgStarRating = Number.parseFloat(spot.avgStarRating).toFixed(1) }
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

    //pagination stuff
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    page = parseInt(page);
    size = parseInt(size);




    if (page < 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                page: "Page must be greater than or equal to 0"

            }
        })
    } if (size < 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {

                size: "Size must be greater than or equal to 0"
            }
        })
    }



    if (minLat !== undefined) {
        if (Number.isNaN(parseFloat(minLat)) || !(minLat.includes('.'))) {
            res.status(400)
            return res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    minLat: "Minimum latitude is invalid"
                }
            })
        }
    }
    if (maxLat !== undefined) {
        if (Number.isNaN(parseFloat(maxLat)) || !(maxLat.includes('.'))) {
            res.status(400)
            return res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    maxLat: "Maximum latitude is invalid"
                }
            })
        }
    }
    if (maxLng !== undefined) {
        if (Number.isNaN(parseFloat(maxLng)) || !(maxLng.includes('.'))) {
            res.status(400)
            return res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    maxLng: "Minimum longitude is invalid",
                }
            })
        }
    }
    if (minLng !== undefined) {
        if (Number.isNaN(parseFloat(minLng)) || !(minLng.includes('.'))) {
            res.status(400)
            return res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    minLng: "Maximum longitude is invalid",
                }
            })
        }
    }
    if (minPrice !== undefined) {
        if (Number.isNaN(parseFloat(minPrice)) || (parseFloat(minPrice) < 0)) {
            res.status(400)
            return res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    minPrice: "Maximum price must be greater than or equal to 0"
                }
            })
        }
    }
    if (maxPrice !== undefined) {
        if (Number.isNaN(parseFloat(maxPrice)) || (parseFloat(maxPrice) < 0)) {
            res.status(400)
            return res.json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    maxPrice: "Minimum price must be greater than or equal to 0"
                }
            })
        }
    }


    //doesnt work - reassigns lat and lng and price
    //all but pagination
    let where = {}

    if (minLat) { where.lat = { [Op.gt]: parseFloat(minLat) } }
    if (maxLat) { where.lat = { [Op.lt]: parseFloat(maxLat) } }
    if (minLng) { where.lng = { [Op.gt]: parseFloat(minLng) } }
    if (maxLng) { where.lng = { [Op.lt]: parseFloat(maxLng) } }
    if (minPrice) { where.price = { [Op.gt]: parseFloat(minPrice) } }
    if (maxPrice) { where.price = { [Op.lt]: parseFloat(maxPrice) } }

    // console.log(where)


    if (Number.isNaN(page) || page < 1) page = 0;
    if (Number.isNaN(size) || size < 1) size = 20;

    let offset = null

    if (page > 0) {
        offset = size * (page - 1)
    }


    const spotBad = await Spot.findAll({

        where,

        // limit: size,
        offset: offset,
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


        let avgRatingArr = await Review.findAll({
            where: { spotId: spot.id },
            attributes: [

                [
                    sequelize.fn("AVG", sequelize.col("stars")),
                    "avgRating"
                ]

            ],

            raw: true
        })

        // console.log(avgRatingArr)



        let { avgRating } = avgRatingArr[0]


        if (isNaN(Number.parseFloat(avgRating).toFixed(1))) { Spots.avgRating = null }
        else { Spots.avgRating = Number.parseFloat(avgRating).toFixed(1) }


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



    res.json({
        Spots: spotArr,
        page: page,
        size: size
    })
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


// Create a Booking from a Spot based on the Spot's id

router.post('/:spotId/bookings', async (req, res) => {

    const userId = req.user.id
    const spotId = req.params.spotId

    const idCheck = await Spot.findByPk(spotId)
    if (!idCheck) {
        const error = new Error(`Spot couldn't be found`)
        error.status = "404"
        throw error;
    }

    const { startDate, endDate } = req.body
    // console.log(startDate)

    //no adding booking in the past
    const today = new Date()
    const date = new Date().toISOString().slice(0, 10)

    // console.log("current date", date)
    // console.log("attempted start date", startDate)

    if (date >= startDate) {
        const error = new Error(`Cannot create a booking in the past`)
        error.status = "403"
        throw error;
    }

    if (startDate >= endDate) {
        let error = new Error(`Validation Error`)
        error.status = '400'
        error.errors = {
            endDate: "End date cannot come before start date"
        }
        throw error
    }

    let spotBookings = await Booking.findAll({
        where: {
            spotId: spotId
        },
        attributes: ["spotId", "startDate", "endDate"],
        raw: true
    })


    for (let booking of spotBookings) {

        let aStartDate = booking.startDate
        let aEndDate = booking.endDate

        // console.log(spotBookings)
        // console.log("end:", aEndDate, "start:", aStartDate)
        // console.log(endDate, startDate)
        // console.log("is our start g or e to this start:", startDate >= aStartDate)
        // console.log("is our start l or e to this end:", startDate <= aEndDate)
        //error fixed, need to format as date only

        if ((startDate >= aStartDate) && (startDate <= aEndDate)) {
            // console.log('!!!!!!!!!!!!!!')
            const error = new Error(`Sorry, this spot is already booked for the specified dates`)
            error.status = "403"
            error.errors = {
                startDate: "Start date conflicts with an existing booking",
            }
            throw error;
        }


        if ((endDate >= aStartDate) && (endDate <= aEndDate)) {
            const error = new Error(`Sorry, this spot is already booked for the specified dates`)
            error.status = "403"
            error.errors = {
                endDate: "End date conflicts with an existing booking",
            }
            throw error;
        }

        if ((startDate < aStartDate) && (endDate > aEndDate)) {
            const error = new Error(`Sorry, this spot is already booked for the specified dates`)
            error.status = "403"
            error.errors = {
                endDate: "End date conflicts with an existing booking",
                startDate: "Start date conflicts with an existing booking",
            }
            throw error;
        }

    }


    let newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate
    })


    res.json(newBooking)

})

module.exports = router;
