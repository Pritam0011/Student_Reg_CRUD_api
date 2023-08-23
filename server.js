require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const db = require("./config/database");

app.listen(port, () => {
	console.log(`App is running on http://localhost:${port}`);
});

db();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes"));
