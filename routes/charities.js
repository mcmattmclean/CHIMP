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

router.get('/:id', function(req, res, next) {
    Charity.findById(req.params.id, function(err, charity) {
      if(err) {
        console.log(err);
      } else {
        res.render('charity', {charity});
      }
    });
  });


module.exports = router;
