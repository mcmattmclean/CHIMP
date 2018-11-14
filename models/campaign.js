const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CampaignSchema = new mongoose.Schema({
    charity: {type: Schema.Types.ObjectId, ref: 'Charity'},
    name: String,
    startDate: Date,
    endDate: Date,
    donations: [{type: Schema.Types.ObjectId, ref: 'Donation'}]
});

module.exports = mongoose.model('Campaign', CampaignSchema);