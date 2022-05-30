const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const multer = require('multer');
const { storage } = require('../cloudinary');
// Multer parses the data coming into the New form. Looking for 'image' and will treat that as 'files'.
const upload = multer({ storage });

// Here we will require the Campground model so we can use it in our page routing.
const Campground = require('../models/campground');
// const res = require('express/lib/response');

router.route('/')
    // This routes to where ALL the campgrounds are INDEXED.
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))

// This route will create a NEW campground
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

router.route('/:id')
    // Details a specific campground in the database.
    .get(catchAsync(campgrounds.showCampground))
    // UPDATES a specific campground
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

// This route is to Edit a Campground in the form.
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;




