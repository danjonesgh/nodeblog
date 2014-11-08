var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var session = require('express-session');
var passport = require('passport');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use(session({ 
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true 
}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    console.log('serialize');
    console.log(user);
    console.log('end serialize');
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
    console.log('deserialize');
  User.findOne({_id: id}, function(err, user) {
    console.log('userdeserialize');
    console.log(user);
    done(err, user);
  });
});

app.use('/', routes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var mongoUri = process.env.MONGOLAB_URI || 'mongodb://localhost/blog';
mongoose.connect(mongoUri, function(err, result) {
  if(err) {
    console.log('error connecting to mongodb with mongoose');
    console.log(err);
  } else {
    console.log('successfully connected to mongodb');
  }
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    /*res.render('error', {
        message: err.message,
        error: {}
    });
*/
});


module.exports = app;
