const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors")

const app = express();

const PORT = process.env.PORT || 8000;

const huddleAPI = process.env.API;
const huddleKey = process.env.API_KEY;

app.use(express.json());
app.use(cors());

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
			res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000")
			res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
			res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
			res.send({
				roomId: el.data?.roomId,
			});
		});
});

app.post("/", (req, res) => {
	const { contractAddress, host } = req.body;
	axios
		.post(
			huddleAPI,
			{
				title: "Metapass Event",
				contractAd1: contractAddress,
				chain: "polygon",
				host: host,
			},
			{
				headers: {
					Authorization: `Bearer ${huddleKey}`,
				},
			}
		)
		.then((el) => {
			console.log(el.data?.meetingLink);
			res.send({
				meetingLink: el.data?.meetingLink,
			});
		});
})

app.listen(PORT, () => {
	console.log("Server is running on port ", PORT);
});

module.exports = app;
