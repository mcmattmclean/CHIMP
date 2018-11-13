var express = require('express');
var router = express.Router();
Users = require("../models/user");

/* GET users listing. */
router.get('/', function(req, res, next) {
  Users.find({}, function(err, users) {
    if(err) {
      console.log(err);
    } else {
      res.render('users', {users: users});
    }
  });
});

module.exports = router;
