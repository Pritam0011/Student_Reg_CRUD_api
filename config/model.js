const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema(
	{
		fname: { type: String, required: true },
		lname: { type: String, required: true },
		roll: { type: Number, require: true },
		age: { type: Number, min: 5, max: 23, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Student_Register", schema, "f2"); //f2 is collection name in database
