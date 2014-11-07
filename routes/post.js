var passport = require('passport');
var multiparty = require('multiparty');

var post = require('./schema.js').Post;


module.exports.addPost = function(req, res) {

  var form = new multiparty.Form();

  form.parse(req, function(err, fields, files) {
  	var title = fields.title[0];
  	var body = fields.body[0];
		var newpost = new post({
			date: new Date(),
			title: title,
			body: body
		});

		newpost.save(function(err, item) {
			if(err)
				console.log('error saving new post: ' + err);

			if(item)
				console.log('successfully saved new post: ' + item);
			else 
				console.log('did not save new post?');
			res.redirect('addpost');
		});
		
  });


}

module.exports.deletePost = function(req, res) {

}

module.exports.editPost = function(req, res) {

}

module.exports.getForm = function(req, res) {
	console.log('in getform');
	res.render('form');
}