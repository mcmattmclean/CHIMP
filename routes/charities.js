var express = require('express');
var router = express.Router();
Charity = require("../models/charity");

// router.get('/', function(req, res, next) {
//     Charity.find({_id: req.query.id}, function(err, charity) {
//         if(err) {
//             console.log(err);
//         } else {
//         res.render('charity', {charity: charity});
//         }
//     })
// });

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

module.exports = router;
