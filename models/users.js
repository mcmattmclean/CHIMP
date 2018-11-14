var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	username: String,
  password: String,
  email: String,
  address: {type: Schema.Types.Object, ref: 'Address'}
});

module.exports = mongoose.model("User", UserSchema);
