// var mongoose = require("mongoose");
//
// var UserSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     email: String,
//     address: {
//         street: String,
//         city: String,
//         state: String,
//         zipcode: String
//     }
// });
//
// module.exports = mongoose.model("User", UserSchema);

// We should be able to do something like this:

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
	username: String,
  password: String,
  email: String,
  address: {type: Schema.Types.Object, ref: 'Address'} // in the UML diagram we address as its own object
});

module.exports = mongoose.model('User', UserSchema);
