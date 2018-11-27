var express = require('express');
var router = express.Router();
var middleware = require("../middleware");
Charity = require("../models/charity");

/* GET home page. */
router.get('/', function(req, res, next) {
  Charity.find({}, function(err, charity) {
    if(err) {
      console.log(err);
    } else {
      res.render('charities', {charity: charity});
    }
  });
});

router.get('/:id', function(req, res, next) {
    Charity.findById(req.params.id, function(err, charity) {
      if(err) {
        console.log(err);
      } else {
        res.render('charity', {charity});
      }
    });
  });

router.get('/:id/edit', middleware.isLoggedIn, function(req, res, next) {
  if(req.user._id != req.params.id) {
    res.send('You are not authorized to view this page.');
  } else {
    Charity.findById(req.params.id)
    .populate('address')
    .exec(function(err, charity) {
      res.render('landing-page', {charity});
    });
  }
});

router.put('/:id', function(req, res, next) {
    Charity.findByIdAndUpdate(req.params.id, req.body, function(err, charity) {
      if(err) {
        console.log(err);
      } else {
        let newAddress = {
          street: req.body.street,
          city: req.body.city,
          state: req.body.state,
          zipcode: req.body.zipcode
        };

        Address.findByIdAndUpdate(req.body.address_id, newAddress, function(err, address) {
          if(err) {
            console.log(err);
          } else {
            res.redirect('/dashboard');
          }
        });
      }
    });
  });


module.exports = router;
