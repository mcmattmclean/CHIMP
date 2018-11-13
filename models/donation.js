var mongoose = require("mongoose");

var DonationSchema = new mongoose.Schema({
    donorId: Number,
    amount: Number,
    dateCreated: Date,
    campaignId: Number
});

module.exports = mongoose.model("Donation", DonationSchema);
