const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const User = require("./user");
const Chat = require("./chat");

const ChatRoom = db.define("chatrooms", {
	newMessages: { type: Sequelize.INTEGER, allowNull: true },
});

ChatRoom.belongsToMany(User, { through: "Users" });
ChatRoom.belongsTo(Chat, { through: "LastMessage" });

module.exports = ChatRoom;
