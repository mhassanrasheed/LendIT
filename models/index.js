const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");

export const User = db.define("user", {
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

export const Post = db.define("post", {
	name: { type: Sequelize.STRING, allowNull: false },
	description: { type: Sequelize.STRING, allowNull: false },
});

export const PostImage = db.define("postImages", {
	image: { type: Sequelize.STRING },
});

export const Chat = db.define("chat", {
	message: { type: Sequelize.STRING, allowNull: false },
	receiverId: { type: Sequelize.INTEGER, allowNull: false },
});

export const ChatRoom = db.define("chatrooms", {
	newMessages: { type: Sequelize.INTEGER, allowNull: true },
});

ChatRoom.hasOne(Chat, through: {'lastMessage'});
ChatRoom.hasMany(Chat);
ChatRoom.belongsToMany(User, through:{'users'});
User.belongsToMany(ChatRoom, through:{'users'});
User.hasMany(Chat);
User.hasMany(Post);
Post.hasMany(PostImage);

db.sync({force:true});
