const express = require("express");
const rou = express.Router();
const stud = require("./config/model");

//read
rou.get("/student/:id([0-9]{4})", async (req, res) => {
	const st = await stud.findOne({ roll: req.params.id });
	if (st === null) return res.status(404).json({ message: "Not Found." });
	return res.status(200).json(st);
});

rou.get("/admin/0101/all", async (req, res) => {
	const st = await stud.find();
	if (st.length === 0)
		return res.status(404).json({ message: "Any document is not available!" });
	return res.status(200).json(st);
});

//create
rou.post("/student/new", async (req, res) => {
	const { fir, last, age } = req.body;

	if (!fir || !last || !age) {
		return res.status(400).json({
			message: "All details are required.",
		});
	}
	if (age < 5 || age > 23)
		return res.status(500).json({ message: `Age should be between 5 to 23.` });
	let nnow = Date.now().toString();
	let now = Number(nnow.substring(nnow.length - 4));
	while (1) {
		let st = await stud.find({ roll: now });
		if (st.length === 0) {
			break;
		}
		now += Math.ceil(Math.random() * 100 + 1);
	}
	const st = new stud({
		fname: fir,
		lname: last,
		roll: now,
		age: age,
	});
	await st.save();
	return res.json({ message: `Student Added Successfully.Roll:- ${now}` });
});

//update

rou.put("/student/:roll/update", async (req, res) => {
	const st = await stud.findOne({ roll: req.params.roll });
	if (st === null) {
		return res.status(404).json({ message: `Not Found!` });
	}
	await stud
		.updateOne({ roll: req.params.roll }, { $set: req.body })
		.exec()
		.then(() => {
			return res.status(200).json({ message: `Updated Successfully.` });
		})
		.catch((e) => {
			return res.status(400).json({ message: `Update failed: ${e}` });
		});
});

//delete
rou.delete("/student/:roll/delete", async (req, res) => {
	const st = await stud.findOne({ roll: req.params.roll });
	if (st === null) {
		return res.status(404).json({ message: `Not Found!` });
	}
	await stud
		.deleteMany({ roll: req.params.roll })
		.exec()
		.then(() => {
			return res.json({ message: `Deleted.` });
		})
		.catch((e) => {
			return res.json({ message: `Deletion Failed: ${e}` });
		});
});

//others
rou.all("*", (req, res) => {
	return res.status(400).json({ message: "Wrong Request...!" });
});

module.exports = rou;
