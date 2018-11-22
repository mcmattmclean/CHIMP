var express = require('express');
var router = express.Router();
Example = require("../models/example");
Donor = require("../models/donor");
Address = require("../models/address");
Charity = require("../models/charity");

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/signin', function(req, res, next) {
	console.log(req.body);
	var q = { 'username' : req.body.uName };
	Charity.findOne({q}, function(err, result){
		if(err){
			Donor.findOne({q}, function(err, result){
				if(err){
					console.log(err);
					res.render('login', { message: 'Username not found' });
				} else {
					if(req.body.pWord == result.password) {
						res.redirect('index');
					} else {
						res.render('login', { message: 'Incorrect password' });
					}
				}
			});
		} else {
			if(req.body.pWord == result.password){
				res.redirect('index');
			} else {
				res.render('login', { message: 'Incorrect password' });
			}
		  }
	});	
});