var mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
	date: Date, 
	title: String,
	body: String
});
var Post = mongoose.model('posts', postSchema);

var UserSchema = new mongoose.Schema({
	username: String,
	password: String
});
var User = mongoose.model('users', UserSchema);

module.exports.Post = Post;
module.exports.User = User;