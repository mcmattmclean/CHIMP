var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String,
    address: {
        street: String,
        city: String,
        state: String,
        zipcode: String
    }
});

module.exports = mongoose.model("User", UserSchema);
