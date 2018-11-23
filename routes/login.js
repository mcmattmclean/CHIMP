var express = require('express');
var router = express.Router();
var passport = require('passport');
Example = require("../models/example");
Donor = require("../models/donor");
Address = require("../models/address");
Charity = require("../models/charity");

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', function(req, res, next) {
	console.log(req.body);
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  });
});

module.exports = router;
