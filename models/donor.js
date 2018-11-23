const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
const User = require('./user');
const Schema = mongoose.Schema;

// We can extend user here
const DonorSchema = extendSchema(User.schema, {
  donations: [{type: Schema.Types.ObjectId, ref: 'Donation'}]
});

DonorSchema.methods.validPassword = function( pwd ) {
    return ( this.password === pwd );
};

module.exports = mongoose.model('Donor', DonorSchema);
