const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const Post = require("./post");
const Chat = require("./chat");
const User = db.define("user", {
	firstName: { type: Sequelize.STRING, allowNull: false },
	lastName: { type: Sequelize.STRING, allowNull: false },
	email: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true,
		validate: { isEmail: true },
	},
	mobileNumber: { type: Sequelize.STRING, allowNull: false, unique: true },
	password: { type: Sequelize.STRING, allowNull: false },
});

User.hasMany(Post, {
	onDelete: "cascade",
});

User.hasMany(Chat, {
	onDelete: "cascade",
});
module.exports = User;
