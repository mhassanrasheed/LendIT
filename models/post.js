const { Sequelize, DataTypes } = require("sequelize");
const User = require("./user");
const db = require("../config/database");
const PostImage = require("./postimage");

const Post = db.define("post", {
	name: { type: Sequelize.STRING, allowNull: false },
	description: { type: Sequelize.STRING, allowNull: false },
});

Post.hasMany(PostImage, {
	onDelete: "cascade",
});

module.exports = Post;
