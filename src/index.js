const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

const huddleAPI = process.env.API;
const huddleKey = process.env.API_KEY;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Hi mom");
});

app.get("/api/getHuddle/:contract", (req, res) => {
	axios
		.post(
			huddleAPI,
			{
				title: "Metapass Event",
				contractAd1: req.params.contract,
			},
			{
				headers: {
					Authorization: `Bearer ${huddleKey}`,
				},
			}
		)
		.then((el) => res.send(el.data?.meetingLink));
});

app.listen(PORT, () => {
	console.log("Server is running on port ", PORT);
});

module.exports = app;
