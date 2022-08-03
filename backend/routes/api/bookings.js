// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, Image, sequelize } = require('../../db/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const { raw } = require('express');
const { check } = require('express-validator');

const router = express.Router();

router.get('/current', restoreUser, async (req, res) => {

    const userId = req.user.id

    let Bookings = await Booking.findAll({
        where: {
            userId: userId
        },

        raw: true,
    })

    let bookArr = []

    for (let booking of Bookings) {

        let Spotty = await Spot.findOne({
            where: { id: booking.spotId },
            raw: true,
            attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]
        })

        let prev = await Image.findOne({
            where: {
                spotId: booking.spotId,
                previewImage: true
            }


        })
        if (prev) {
            Spotty.previewImage = prev.url
        }
        if (!prev) { Spotty.previewImage = null }


        let realBooking = {
            id: booking.id,
            spotId: booking.spotId,
            Spot: Spotty,
            userId: booking.userId,
            startDate: booking.startDate,
            endDate: booking.endDate,
            createdAt: booking.createdAt,
            updatedAt: booking.updatedAt

        }
        bookArr.push(realBooking)


    }

    res.json({ Bookings: bookArr })
})


//edit booking
router.put('/:bookingId', async (req, res) => {
    const userId = req.user.id
    const bookingId = req.params.bookingId
    const { startDate, endDate } = req.body

    let oldBooking = await Booking.findOne({
        where: { id: bookingId },
        raw: true
    })

    //check if booking exists
    if (!oldBooking) {
        const error = new Error(`Booking couldn't be found`)
        error.status = "404"
        throw error;
    }

    //user must match user on booking to edit
    if (userId !== oldBooking.userId) {
        const error = new Error(`Forbidden`)
        error.status = "403"
        throw error;
    }

    //start date must be before end date
    if (startDate >= endDate) {
        let error = new Error(`Validation Error`)
        error.status = '400'
        error.errors = {
            endDate: "endDate cannot come before startDate"
        }
        throw error
    }


    //checking conflicts
    let spotBookings = await Booking.findAll({
        where: {
            spotId: oldBooking.spotId
        },
        attributes: ["spotId", "startDate", "endDate"],
        raw: true
    })


    for (let booking of spotBookings) {

        let aStartDate = booking.startDate
        let aEndDate = booking.endDate

        // console.log("end:", aEndDate, "start:", aStartDate)
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
    }

    //no editing in the past
    const today = new Date()
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    if (date >= oldBooking.startDate) {
        const error = new Error(`Past bookings can't be modified`)
        error.status = "403"
        throw error;
    }

    let checkedBooking = await Booking.findOne({
        where: { id: bookingId }
    })

    checkedBooking.startDate = startDate
    checkedBooking.endDate = endDate

    const editBooking = await checkedBooking.save()

    res.json(editBooking)


})





module.exports = router;
