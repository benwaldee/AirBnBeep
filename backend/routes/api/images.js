// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, Image, sequelize } = require('../../db/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const { raw } = require('express');
const { check } = require('express-validator');

const router = express.Router();

//delete an image

router.delete(`/:imageId`, async (req, res) => {

    const userId = req.user.id
    const imageId = req.params.imageId

    const deleteImage = await Image.findOne({
        where: {
            id: imageId,
        }
    })

    if (!deleteImage) {
        const error = new Error(`Image couldn't be found`)
        error.status = "404"
        throw error;
    }

    let userCheck = deleteImage.toJSON()

    if (userId !== userCheck.userId) {
        const error = new Error(`Forbidden`)
        error.status = "403"
        throw error;
    }

    deleteImage.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })


})


module.exports = router;
