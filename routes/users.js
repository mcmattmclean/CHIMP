var express = require('express');
var router = express.Router();
Donor = require("../models/donor");
Charity = require("../models/charity");

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Now we have to find donors and populate the address field
  let charities = {};
  Charity.find().populate(
    'address'
  ).exec(function(err, charities) {
    if(err) {
      console.log(err);
    } else {
     //charities = charities;
      let donors = {};
  Donor.find().populate(
    'address'
  ).exec(function(err, donors) {
    if(err) {
      console.log(err);
    } else {
      res.render('users', {donors: donors, charities: charities});
    }
  });
    }
  });
});


module.exports = router;
