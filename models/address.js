const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
	street: String,
  city: String,
  state: String,
  zip: String
});

module.exports = mongoose.model('Address', AddressSchema);
