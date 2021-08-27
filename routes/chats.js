const express = require("express");
const path = require("path"); // dont need it
const router = express.Router();
const Chat = require("../models/message");
const db = require("../config/database");

router.post("/addMessage", async (req, res) => {
	try {
		let message = await Chat.create({
			userId: req.body.userId,
			receiverId: req.body.receiverId,
			message: req.body.message,
		});
		if (message) {
			res.status(200).json({
				message: message.message,
			});
		} else {
			res.send("message add failed");
		}
	} catch (error) {
		res.send(error);
	}
});

const { Op } = require("sequelize");
const User = require("../models/user");
router.post("/getMessages", async (req, res) => {
	try {
		let messages = await Chat.findAll({
			where: {
				[Op.or]: [
					{
						[Op.and]: [
							{ userId: req.body.userId },
							{ receiverId: req.body.receiverId },
						],
					},
					{
						[Op.and]: [
							{ userId: req.body.receiverId },
							{ receiverId: req.body.userId },
						],
					},
				],
			},
			order: [["createdAt", "DESC"]],
		});
		if (messages) {
			console.log(messages);
			res.status(200).json({
				message: messages,
			});
		}
	} catch (error) {
		console.log(error);
	}
});

router.post("/getMessagesWithEveryUser", async (req, res) => {
	try {
		let messages = await Chat.findAll({
			where: {
				userId: req.body.userId,
			},
		});
		if (messages) {
			console.log(messages);
			res.status(200).json({
				messages: messages,
			});
		}
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
