const { Sequelize, DataTypes } = require("sequelize");
const db = require("./config/database");

const User = db.define("users", {
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

const Post = db.define("posts", {
	name: { type: Sequelize.STRING, allowNull: false },
	description: { type: Sequelize.STRING, allowNull: false },
});

const PostImage = db.define("postImages", {
	image: { type: Sequelize.STRING },
});

const Message = db.define("chats", {
	content: { type: Sequelize.STRING, allowNull: false },
});

const ChatRoom = db.define("chatrooms", {
	newMessages: { type: Sequelize.INTEGER, allowNull: true },
});

User.belongsToMany(Message, { through: "Messages" });
User.belongsToMany(ChatRoom, { through: "ChatRoomUsers" });
User.hasMany(Post);
Post.hasMany(PostImage);
ChatRoom.hasOne(Message, { through: "LastMessage" });
ChatRoom.belongsToMany(Message, { through: "Messages" });
ChatRoom.belongsToMany(User, { through: "ChatRoom" });
////

// ChatRoom.hasOne(Message, { through: "lastMessage" });
// ChatRoom.hasMany(Message);
// ChatRoom.belongsToMany(User, { through: "userss" });
// User.belongsToMany(ChatRoom, { through: "userss" });
// User.hasMany(Message);

db.sync({ force: true });
