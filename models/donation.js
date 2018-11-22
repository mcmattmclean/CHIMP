const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DonationSchema = new mongoose.Schema({
    donor: {type: Schema.Types.ObjectId, ref: 'Donor'},
    amount: Number,
    dateCreated: Date,
    campaign: {type: Schema.Types.ObjectId, ref: 'Campaign'}
});

module.exports = mongoose.model('Donation', DonationSchema);
