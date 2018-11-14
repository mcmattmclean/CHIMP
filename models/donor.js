const mongoose = require('mongoose');
const extendSchema = require('mongoose-extend-schema');
var User = require('./user');

// We can extend user here
const DonorSchema = extendSchema(User.schema, {
  dontaions: Number, // needs to later be populated with dontaion collections [{type: Schema.Types.Object, ref: 'Donation'}]
});

module.exports = mongoose.model("Donor", DonorSchema);
