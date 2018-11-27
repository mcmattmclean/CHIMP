var express = require('express');
var router = express.Router();
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

router.get('/charity', function(req, res, next) {
    Charity.find({_id: req.params.id}, function(err, charity) {
      if(err) {
        console.log(err);
      } else {
        res.render('charity', {charity: charity});
      }
    });
  });
  

module.exports = router;
