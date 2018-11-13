var mongoose = require("mongoose");

var DonorSchema = new mongoose.Schema({
    userId: Number,
    donations: [Number]
});

module.exports = mongoose.model("Donor", DonorSchema);
