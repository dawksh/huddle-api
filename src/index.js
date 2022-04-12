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
	console.log("NFT Contract: ", req.params.contract);
	axios
		.post(
			huddleAPI,
			{
				title: "Metapass Event",
				contractAd1: req.params.contract,
				chain: "polygon",
				host: "0x28172273CC1E0395F3473EC6eD062B6fdFb15940",
			},
			{
				headers: {
					Authorization: `Bearer ${huddleKey}`,
				},
			}
		)
		.then((el) => {
			console.log(el.data?.roomId);
			res.send({
				roomId: el.data?.roomId,
			});
		});
});

app.listen(PORT, () => {
	console.log("Server is running on port ", PORT);
});

module.exports = app;
