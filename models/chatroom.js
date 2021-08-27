const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const User = require("./user");
const Message = require("./message");

const ChatRoom = db.define("chatrooms", {
	newMessages: { type: Sequelize.INTEGER, allowNull: true },
});

ChatRoom.hasMany(Message);

module.exports = ChatRoom;
