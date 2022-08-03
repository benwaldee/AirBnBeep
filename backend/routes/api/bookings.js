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
        raw: truw
    })

})

module.exports = router;
