const express = require('express');
const mongoose = require('mongoose');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Review = require('../models/review');
const { hotelSchema, reviewSchema } = require('../schemas.js');
const Hotel = require('../models/hotel');
const { validateReview , isLoggedIn, isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;