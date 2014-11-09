var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


var login = require('./login.js');
var post = require('./post.js');
var posts = require('./schema.js').Post;

var isLoggedIn = function() {
	return function(req, res, next) {
		console.log(req.session);
		if(req.session) {
			console.log('in req session');
			if(req.session.passport.user) {

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
	posts.find().sort({date: -1}).exec(function(err, item) {
  	res.render('index', {posts: item});
	});
});

router.get('/addpost', isLoggedIn(), function(req, res, next) {
	post.getForm(req, res);
});

router.post('/addpost', isLoggedIn(), function(req, res, next) {
	post.addPost(req, res);
});

router.get('/login', function(req, res) {
	login.getForm(req, res);
});

var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { 
      	console.log('error in strat: ' + err);
      	return done(err); }
      if (!user) {
      	console.log('no user');
        return done(null, false, { message: 'Incorrect username.' });
      }
 
      return done(null, user);
    });
  }
));

router.post('/login', passport.authenticate('local', 
	{ successRedirect: '/addpost',
    failureRedirect: '/login' }
    ));

/*
router.post('/login', function(req, res) {
	login.authenticate(req, res);
});
*/


/*
router.use(function(req, res, next) {
	console.log(res);
});
*/



module.exports = router;
