var express = require('express');
var router = express.Router();
Charity = require("../models/charity");
Address = require("../models/address");

/* GET newCharity page. */
router.get('/', function(req, res, next) {
  res.render('newCharity');
});

router.post('/', function(req, res, next) {
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
