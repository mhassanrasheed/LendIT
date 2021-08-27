const express = require("express");
const session = require("express-session");
// const multer = require("multer");
// const path = require("path");
const bcrypt = require("bcrypt");
const db = require("./config/database");
const user = require("./routes/users");
const post = require("./routes/posts");
const chat = require("./routes/chats");
var path = require("path");
// require('./public/uploads/')
// const { Sequelize } = require("sequelize/types");
const ChatRoom = require("./models/chatroom");

var SequelizeStore = require("connect-session-sequelize")(session.Store);
// const PostImage = require("./models/postimage");
const User = require("./models/user");

// app init
const app = express();
const IN_PROD = process.env.NODE_ENV === "development";

app.use(express.urlencoded({ extended: false }));

const isAuth = (req, res, next) => {
	console.log("hola amigo");
	if (req.session.isAuth) {
		console.log("object");
		next();
	} else {
		res.send("log In first");
	}
};

db.authenticate()
	.then(() => console.log("Connected to Database"))
	.catch((err) => console.log(err));

console.log(__dirname);
let file = "image-1628557637324.jpg";
console.log(__dirname + `./public/uploads/${file}`);
console.log(path.join("./public/uploads/", file));

app.use("/user", user);
app.use("/post", post);
app.use("/chat", chat);
app.use("/postImages", express.static(__dirname + "/public/uploads"));
app.get("/fetchImage/:file(*)", (req, res) => {
	let file = req.params.file;
	console.log(__dirname + `public/uploads/${file}`);
	let fileLocation = path.join("./public/uploads/", file);
	res.send({ image: fileLocation });
	// res.sendFile(__dirname + `\public\uploads\${file}`);
});
app.use(express.json);

app.get("/", (req, res) => {
	res.send("index");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
	console.log(`listening on ${port}`);
});
