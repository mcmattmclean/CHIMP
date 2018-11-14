var express = require('express');
var router = express.Router();
Example = require("../models/example");
Donor = require("../models/donor");
Address = require("../models/address");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/register', function(req, res, next) {
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

router.post('/', function(req, res, next) {
  Example.create({text: req.body.exampleText}, function(err, text) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  });
});

module.exports = router;
