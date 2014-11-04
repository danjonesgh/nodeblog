var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var login = require('./login.js');
var post = require('./post.js');
var posts = require('./schema.js').Post;

/* GET home page. */
router.get('/', function(req, res) {
	posts.find().sort({date: -1}).exec(function(err, item) {
  	res.render('index', {posts: item});
	});
});

router.get('/addpost', function(req, res) {
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

module.exports = router;
