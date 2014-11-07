var bcrypt = require('bcrypt');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('./schema.js').User;

module.exports.getForm = function(req, res) {

	res.render('login');
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      bcrypt.compare(password, user.password, function(err, res) {
        if(err) 
          console.log('error comparing password and hash');

        if(res) {
          console.log('sucess in comparing password and hash');
          return done(null, user);
        } 
        else {
          return done(null, false);
        }
      });

      //if (!user.validPassword(password)) {
      //  return done(null, false, { message: 'Incorrect password.' });
      // /}
     // return done(null, user);
    });
  }
));

module.exports.authenticate = function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    console.log('inside auth');
    console.log(err);
    console.log(user);
    if (err) { console.log('auth error: ' + err); }
    if (!user) { console.log('no user'); }

    req.login(user, function(err) {
      if (err) { console.log('req login error: ' + err); }
      
      res.redirect('/addpost');
    });
  })(req, res, next);
}




