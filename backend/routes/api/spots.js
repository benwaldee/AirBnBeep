// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, Image } = require('../../db/models');
const jwt = require('jsonwebtoken');

const router = express.Router();

router.get('/', async (req, res) => {
    res.json('hello world')
})

module.exports = router;
