var express = require('express');
var router = express.Router();
Example = require("../models/example");
Donor = require("../models/donor");
Address = require("../models/address");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
