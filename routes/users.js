var express = require('express');
var router = express.Router();
Donor = require("../models/donor");

/* GET users listing. */
router.get('/', function(req, res, next) {
  // Now we have to find donors and populate the address field
  let donors = {};
  Donor.find().populate(
    'address'
  ).exec(function(err, donors) {
    if(err) {
      console.log(err);
    } else {
      res.render('users', {donors: donors});
    }
  });
});

module.exports = router;
