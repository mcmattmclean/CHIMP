var express = require('express');
var router = express.Router();
Example = require("../models/example");
User = require("../models/user")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/registerUser', function(req, res, next) {
  res.render('registerUser');
});

router.get('/accountSuccess', function(req, res, next) {
  res.render('accountSuccess');
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

router.post('/addDonor', function(req, res, next) {
  console.log(req.body.username);
  User.create(
    {
      username: req.body.username, 
      password: req.body.password, 
      email: req.body.email, 
      address: {
        street: req.body.street,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode
      } 
    }, function(err, user) {
      if(err) {
        console.log(err);
        res.status(500).send({message: "Some error occurred while creating the user."});
      } else {
        console.log(user);
        res.redirect('/accountSuccess');
      }
  });
});

module.exports = router;
