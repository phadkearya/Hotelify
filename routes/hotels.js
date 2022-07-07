const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Review = require('../models/review');
const { isLoggedIn, isAuthor, validateHotel } = require('../middleware');
const Hotel = require('../models/hotel');
const multer = require('multer');
const hotels = require('../controllers/hotels');
const { storage } = require('../cloudinary');
const upload = multer({ storage});


router.get('/', catchAsync(hotels.index));

router.get('/new', isLoggedIn, hotels.renderNewForm);

router.post('/', isLoggedIn, upload.array('image'), validateHotel, catchAsync(hotels.createHotel));

// router.post('/', upload.single('image'), (req, res) => {
//     console.log(req.body, req.file);
// });

router.get('/:id', catchAsync(hotels.showHotel));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(hotels.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, upload.array('image'), validateHotel, catchAsync(hotels.updateHotel));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(hotels.deleteHotel));

module.exports = router;