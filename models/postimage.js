const { Sequelize, DataTypes } = require("sequelize");
const Post = require("./post");
const db = require("../config/database");

const PostImage = db.define("postImages", {
	image: { type: Sequelize.STRING },
});

module.exports = PostImage;
