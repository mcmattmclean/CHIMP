var express = require('express');
var router = express.Router();
var middleware = require("../middleware");

router.get('/', middleware.isLoggedIn, function(req, res, next) {
  res.render('dashboard');
});

module.exports = router;
