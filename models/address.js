var mongoose = require("mongoose");

var AddressSchema = new mongoose.Schema({
	street: String,
  city: String,
  state: String,
  zip: String
});

module.exports = mongoose.model("Address", AddressSchema);
