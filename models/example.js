var mongoose = require("mongoose");

var ExampleSchema = new mongoose.Schema({
	text: String,
});

module.exports = mongoose.model("Example", ExampleSchema);
