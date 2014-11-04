var mongoose = require('mongoose');


var postSchema = new mongoose.Schema({
	date: Date, 
	title: String,
	body: String
});
var Post = mongoose.model('posts', postSchema);

module.exports.Post = Post;