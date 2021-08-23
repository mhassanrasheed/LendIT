const express = require("express");
const router = express.Router();
const db = require("../config/database");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv/config");

router.get("/", (req, res) =>
	User.findAll()
		.then((users) => {
			console.log(users);
			res.sendStatus(200);
		})
		.catch((err) => console.log(err))
);

const isAuth = (req, res, next) => {
	const authHeader = req.get("Authorization");
	if (!authHeader) {
		return res.status(401).json({ message: "not authenticated" });
	}
	const token = authHeader.split(" ")[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, "secret");
	} catch (err) {
		return res
			.status(500)
			.json({ message: err.message || "could not decode the token" });
	}
	if (!decodedToken) {
		res.status(401).json({ message: "unauthorized" });
	} else {
		res.status(200).json({ message: "here is your resource" });
	}
};

router.post("/Register", async (req, res) => {
	try {
		const salt = await bcrypt.genSalt();
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const user = await User.create({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			mobileNumber: parseInt(req.body.mobileNumber),
			password: hashedPassword,
		});
		if (user !== null) {
			const token = jwt.sign({ email: req.body.email }, "secret", {
				expiresIn: "1h",
			});
			res.status(200).json({
				message: "Account Created",
				token: token,
				User: {
					id: user.id,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
				},
			});
		}
	} catch (error) {
		if (error.name == "SequelizeValidationError") {
			res.send("email is not valid");
		} else if (error.name == "SequelizeUniqueConstraintError") {
			console.log(Object.keys(error.fields).toString());
			if (Object.keys(error.fields).toString() == "email") {
				res.send("This email already exits");
			} else if (Object.keys(error.fields).toString() == "mobileNumber") {
				res.send("An account with this mobile number already exists");
			} else {
				res.send(error);
			}
		} else {
			res.send(error);
		}
	}
});

router.post("/login", async (req, res) => {
	try {
		const user = await User.findOne({ where: { email: req.body.email } });
		if (user === null) {
			console.log("user", user);
			res.status(404).json({
				message: "An Account with this email does not exists",
			});
		} else if (await bcrypt.compare(req.body.password, user.password)) {
			const token = jwt.sign({ email: req.body.email }, "secret", {
				expiresIn: "1h",
			});
			res.status(200).json({
				message: "Login Successful",
				token: token,
				User: {
					id: user.id,
					email: user.email,
					firstName: user.firstName,
					lastName: user.lastName,
				},
			});
		} else {
			res.status(404).json({
				message: "The password you entered is incorrect",
			});
		}
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;
