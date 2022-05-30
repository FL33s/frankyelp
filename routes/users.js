const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users');

router.route('/register')
.get(users.renderRegister)
.post(catchAsync(users.register));

router.route('/register')
.get(users.renderRegister)
.post(catchAsync(users.register));

router.route('/login')
// Making our login route: One of them will serve a form.
.get(users.renderLogin)
// This is where we'll handle the logging in and making sure credentials are valid.
.post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)


router.get('/logout', users.logout)

module.exports = router;