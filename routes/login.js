var bcrypt = require('bcrypt');

var User = require('./schema.js').User;

module.exports.getForm = function(req, res) {




  console.log(req.session);
	res.render('login');
}

function comparePassword(passwordEntered, dbHash, callback) {
  bcrypt.compare(passwordEntered, dbHash, function(err, result) {
    if(err) {
      console.log('error comparing password and hash');
      callback(err, null);
    }

    if(result) {
      console.log('sucess in comparing password and hash');
      callback(null, result);
    } 
    else {
      console.log('negative result');
      callback(err, null);
    }
  });    
}
  

module.exports.login = function(req, res) {
  User.findOne({username: req.body.username}, function(err, user) {
    if(err) {
      console.log('error finding user: ' + err);
      res.redirect('login');
    }
    if(user) {
      comparePassword(req.body.password, user.password, function(err, result) {
        if(err) {
          console.log('error comparing password: ' + err);
          res.redirect('login');
        }
        if(result) {
          console.log('yes result compare');
          req.session.loggedIn = true;
          console.log(req.session);
          res.redirect('addpost');
        }
        else {
          res.redirect('login');
        }
      });
    }
    else {
      res.redirect('login');
    }

  });

}




