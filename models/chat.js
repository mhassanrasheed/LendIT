const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Chat = db.define("chat", {
	message: { type: Sequelize.STRING, allowNull: false },
	receiverId: { type: Sequelize.INTEGER, allowNull: false },
});

module.exports = Chat;
