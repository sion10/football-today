var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var updateGames = require('./server/scripts/updateGames');
var checkResults = require('./server/scripts/checkResults');
var index = require('./routes/index');
var submit = require('./routes/submit');
var login = require('./routes/auth');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

mongoose.connect('mongodb://localhost/test');

// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
var facebookStrategy = require('./server/passport/facebook');
passport.use('facebook', facebookStrategy);

// pass the authenticaion checker middleware
var authCheck = require('./server/scripts/check');

setInterval(updateGames, 600000);
//setInterval(checkResults, (60000*60*2));

app.use('/api', authCheck);
app.use('/submit', authCheck);


app.use('/api', index);
app.use('/submit', submit);
app.use('/login', login);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
