var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var home = require('./home.js');
var login = require('./login.js');
var post = require('./post.js');
var Post = require('./schema.js').Post;


var isLoggedIn = function() {
	return function(req, res, next) {
		console.log(req.session);
		if(req.session) {
			console.log('in req session');
			if(req.session.loggedIn) {

				console.log('yes user');
				next();
			}
			else {
				console.log('redirect to login?');
				res.redirect('login');
			}
		}
		

			//console.log('redirect');
			//res.redirect('login');
		
		
}};


/* GET home page. */
router.get('/', function(req, res) {
	home.getMonthlyPosts(function(allposts) {
		console.log(allposts);
		Post.find().sort({date: -1}).exec(function(err, item) {
	  	res.render('index', {posts: item, archive: allposts});
		});		
	});
});

router.get('/:year', function(req, res) {

});

router.get('/:year/:month', function(req, res) {
	res.send(req.params.year + req.params.month);
});

router.get('/addpost', isLoggedIn(), function(req, res) {
	post.getForm(req, res);
});

router.post('/addpost', function(req, res) {
	post.addPost(req, res);
});

router.get('/login', function(req, res) {
	login.getForm(req, res);
});

router.post('/login', function(req, res) {
	login.login(req, res);
});

router.get('/test', function(req, res) {
	res.render('new');
});



/*
router.use(function(req, res, next) {
	console.log(res);
});
*/



module.exports = router;
