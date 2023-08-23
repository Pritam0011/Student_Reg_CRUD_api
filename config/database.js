const mongoose = require("mongoose");

function db() {
	mongoose.connect(process.env.URL_FOR_CONNECTION);
	const connection = mongoose.connection;
	connection.once("open", () => {
		console.log("Database connected succesfully.");
	});
}

module.exports = db;
