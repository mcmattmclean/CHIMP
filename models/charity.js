var mongoose = require("mongoose");

var CharitySchema = new mongoose.Schema({
    userId: Number,
    verified: Boolean,
    expirationDate: Date,
    campaigns: [Number]
});

module.exports = mongoose.model("Charity", CharitySchema);
