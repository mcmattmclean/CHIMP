const mongoose = require('mongoose');

const ExampleSchema = new mongoose.Schema({
	text: String,
});

module.exports = mongoose.model('Example', ExampleSchema);
