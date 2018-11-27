var express = require('express');
var router = express.Router();
Charity = require("../models/charity");
Address = require("../models/address");

/* GET register page. */
router.get('/', function(req, res, next) {
  res.render('register');
});

router.get('/newCharity', function(req, res, next) {
  res.render('newCharity');
});

router.post('/newCharity', function(req, res, next) {
  console.log(req.body);
  var address = new Address({
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zipcode
  });

  address.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      Charity.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        address: address._id,
        name: req.body.name,
        missionStatement: req.body.missionStatement
      }, function(err, text) {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
    }
  });
});

router.get('/newDonor', function(req, res, next) {
  res.render('newDonor');
});

router.post('/newDonor', function(req, res, next) {
  console.log(req.body);
  // We can do the same thing for other collections that reference collections
  // I think we can use the create method to acheive the same thing...
  var address = new Address({
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    zip: req.body.zipcode
  });

  address.save(function(err) {
    if(err) {
      console.log(err);
    } else {
      Donor.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        address: address._id
      }, function(err, text) {
        if(err) {
          console.log(err);
        } else {
          res.redirect('/');
        }
      });
    }
  });
});

module.exports = router;
