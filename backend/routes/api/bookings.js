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

        Spotty.previewImage = prev.url


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

module.exports = router;
