const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const User = require('./user');
const Schema = mongoose.Schema;

const CharitySchema = extendSchema(User.schema, {
    verified: Boolean,
    expirationDate: Date,
    campaigns: [{type: Schema.Types.ObjectId, ref: 'Campaign'}]
});

module.exports = mongoose.model('Charity', CharitySchema);
