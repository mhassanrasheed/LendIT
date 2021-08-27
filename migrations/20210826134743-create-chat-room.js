"use strict";
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable("ChatRooms", {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			newMessage: {
				type: Sequelize.INTEGER,
			},
			lastMessage: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: "Messages",
					key: "id",
				},
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},
	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable("ChatRooms");
	},
};
