const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
	username: String,
  password: String,
  email: String,
  address: {type: Schema.Types.Object, ref: 'Address'} // in the UML diagram we address as its own object
});

module.exports = mongoose.model('User', UserSchema);
