var express = require('express');
var router = express.Router();
var passport = require('passport');
Example = require("../models/example");
Donor = require("../models/donor");
Address = require("../models/address");
Charity = require("../models/charity");

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', {message: req.flash('error')});
});

router.post('/', passport.authenticate('login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true,
  }), function(req, res) {

  });

module.exports = router;
