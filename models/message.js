const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

const Message = db.define("message", {
	content: { type: Sequelize.STRING, allowNull: false },
});

module.exports = Message;
