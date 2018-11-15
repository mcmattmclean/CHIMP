var express = require('express');
var router = express.Router();
Example = require("../models/example");

/* GET home page. */
router.get('/', function(req, res, next) {
  Example.find({}, function(err, example) {
    if(err) {
      console.log(err);
    } else {
      res.render('example', {example: example});
    }
  });
});

module.exports = router;
