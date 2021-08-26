const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const db = require("../config/database");
const jwt = require("jsonwebtoken");
const Post = require("../models/post");
const PostImage = require("../models/postimage");
require("dotenv/config");

// init upload
// set storage engine
const storage = multer.diskStorage({
	destination: "./public/uploads/",
	filename: (req, file, callback) => {
		callback(
			null,
			file.fieldname + "-" + Date.now() + path.extname(file.originalname)
		);
	},
});

const upload = multer({
	storage: storage,
});

router.post("/postImages", async (req, res) => {
	try {
		let postId = req.body.postId;
		console.log("postId", typeof postId, postId);
		let images = await PostImage.findAll({ where: { postId: postId } });
		if (images) {
			res.send(images);
		} else {
			res.send("no images found");
		}
	} catch (error) {
		res.send(error);
	}
});

router.get("/", async (req, res) => {
	try {
		const posts = await Post.findAll({ include: PostImage });
		if (posts) {
			console.log("posts", posts[0]);
			postId = posts[0].id;
			res.send(posts);
		} else {
			console.log("no posts found");
		}
	} catch (error) {
		console.log(error);
	}
});

//Adding Posts
router.post("/addItem", async (req, res) => {
	try {
		const post = await Post.create({
			name: req.body.name,
			description: req.body.description,
			userId: await parseInt(req.body.userId),
		});
		if (post !== null) {
			res.status(200).json({
				message: "Post Added",
				postId: post.id,
			});
		}
	} catch (error) {
		res.send(error);
	}
});

const isAuth = (req, res, next) => {
	const authHeader = req.get("Authorization");
	console.log(authHeader);
	if (!authHeader) {
		console.log("in there");

		return res.status(401).json({ message: "not authenticated" });
	}
	const token = authHeader.split(" ")[1];
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, "secret");
		console.log("decodedd", decodedToken);
		if (!decodedToken) {
			console.log("unauthorized");
			res.status(401).json({ message: "unauthorized" });
		} else {
			console.log("here is your resource");
			// res.status(200).json({ message: "here is your resource" });
			next();
		}
	} catch (err) {
		console.log(err);
		return res
			.status(500)
			.json({ message: err.message || "could not decode the token" });
	}
};

router.post("/addImage", isAuth, upload.single("image"), async (req, res) => {
	try {
		const postObj = JSON.parse(JSON.stringify(req.body)); // [Object: null prototype] { postID: 'x' }
		const Image = await PostImage.create({
			image: req.file.filename,
			postId: postObj.postID,
		});
		if (Image !== null) {
			res.send("Image Added");
		} else {
			res.send("Failed");
		}
	} catch (error) {
		res.send(error);
	}
});

module.exports = router;
