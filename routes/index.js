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
/*

          <% posts.forEach(function(entry) { %>
          <div class="blog-post">
            <h2 class="blog-post-title"><%= entry.title %></h2>
            <p class="blog-post-meta">
              <%= entry.date.getMonth()+1 %>-<%= entry.date.getDate() %>-<%= entry.date.getFullYear() %>
            </p>
            <%= entry.body %>
          </div><!-- /.blog-post -->
          <% }); %>
          */
/* GET home page. */
router.get('/', function(req, res) {
	console.log('in root route');
	home.getMonthlyPosts(function(allposts) {
		console.log(allposts);
		Post.find().sort({date: -1}).exec(function(err, item) {
	  	res.render('index', { archive: allposts});
		});		
	});
});

router.get('/:year', function(req, res) {

});

router.get('/:year/:month', function(req, res) {
	var year = req.params.year;
	var month = req.params.month;
	month--;
	
	var start = new Date(year, month, 1);
	// months vary their ending day number, 28, 29, 30, 31
	// so just put the end as the first of the next month
	var end = new Date(year, month+1, 1);

	
	home.getMonthlyPosts(function(allposts) {
		Post.find({date: {$gte: start, $lt: end}}, function(err, item) {
			//console.log(item);
			res.send(item);
			//res.render('index', { archive: allposts});
		});		
	});

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
