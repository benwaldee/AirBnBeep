// backend/routes/api/session.js
const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Spot, Booking, Review, Image, sequelize } = require('../../db/models');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const { raw } = require('express');
const { check } = require('express-validator');

const router = express.Router();

// Get all Reviews of the Current User
router.get('/current', restoreUser, async (req, res) => {
    let userId = req.user.id

    const Reviews = await Review.findAll({
        where: { userId: userId },
        include: [
            { model: User, attributes: ["id", "firstName", "lastName"] },
            {
                model: Spot,
                attributes: ["id", "ownerId", "address", "city", "state", "country", "lat", "lng", "name", "price"]
            },
            { model: Image, as: "Images", attributes: ["id", ["reviewId", "imageableId"], "url"] }
        ]
    })

    res.json({ Reviews })
})

// Add an Image to a Review based on the Review's id

router.post('/:reviewId/images', restoreUser, async (req, res) => {

    let userId = req.user.id

    const reviewId = req.params.reviewId

    let checkReviewId = await Review.findByPk(reviewId)
    if (!checkReviewId) {
        const error = new Error(`Review couldn't be found`)
        error.status = "404"
        throw error;
    }

    let checkNumImages = await Image.findAll({
        where: { reviewId: reviewId },
        raw: true
    })

    if (checkNumImages.length >= 10) {
        const error = new Error(`Maximum number of images for this resource was reached`)
        error.status = "403"
        throw error;
    }

    let { url } = req.body

    let newReviewImage = await Image.create({
        url,
        reviewId,
        userId,
    })
    newReviewImage = newReviewImage.toJSON()

    let responseImage = {}
    responseImage.id = newReviewImage.id
    responseImage.imageableId = reviewId
    responseImage.url = url



    res.json(responseImage)
})

router.put('/:reviewId', restoreUser, async (req, res) => {

    let userId = req.user.id

    let reviewId = req.params.reviewId

    let found = await Review.findByPk(reviewId)
    if (!found) {
        const error = new Error(`Review couldn't be found`)
        error.status = "404"
        throw error;
    }

    const reviewEdit = await Review.findOne({
        where: {
            userId: userId,
            id: reviewId
        }
    })
    if (!reviewEdit) {
        const error = new Error(`Forbidden`)
        error.status = "403"
        throw error;
    }

    const { review, stars } = req.body

    reviewEdit.review = review
    reviewEdit.stars = stars

    reviewEdit.save()

    res.json(reviewEdit)


})

router.delete('/:reviewId', restoreUser, async (req, res) => {

    const userId = req.user.id
    const reviewId = req.params.reviewId

    let checkId = await Review.findOne({
        where: {
            id: reviewId
        }
    })

    if (!checkId) {
        const error = new Error(`Review couldn't be found`)
        error.status = "404"
        throw error;
    }
    if (checkId.userId !== userId) {
        const error = new Error(`Forbidden`)
        error.status = "403"
        throw error;
    }



    checkId.destroy()

    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

})


module.exports = router;
