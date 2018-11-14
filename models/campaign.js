var mongoose = require("mongoose");

var CampaignSchema = new mongoose.Schema({
    charityId: Number,
    name: String,
    startDate: Date,
    endDate: Date,
    donations: [Number]
});

module.exports = mongoose.model("Campaign", CampaignSchema);