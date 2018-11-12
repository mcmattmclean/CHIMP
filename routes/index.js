var express = require('express');
var router = express.Router();
Example = require("../models/example");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/', function(req, res, next) {
  console.log(req.body.exampleText);
  Example.create({text: req.body.exampleText}, function(err, text) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/');
    }
  })
});

module.exports = router;
