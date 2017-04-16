var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var passport = require('passport');
var React = require('react');
var Helmet = require('react-helmet').Helmet;
require('ignore-styles');
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './client/src/routes/routes';
import NotFoundPage from './client/src/components/NotFoundPage';

var updateGames = require('./server/scripts/updateGames');
var checkResults = require('./server/scripts/checkResults');
var index = require('./routes/index');
var submit = require('./routes/submit');
var login = require('./routes/auth');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

function wwwRedirect(req, res, next) {
    if (req.headers.host.slice(0, 4) === 'www.') {
        var newHost = req.headers.host.slice(4);
        return res.redirect(301, req.protocol + '://' + newHost + req.originalUrl);
    }
    next();
};

app.set('trust proxy', true);
app.use(wwwRedirect);

app.use(favicon(path.join(__dirname, 'client/build', 'favicon.ico')));
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
var addUser = require('./server/scripts/addUser')

setInterval(updateGames, 60000 * 10);
setInterval(function(){checkResults(Date.now(), 'en')}, 60000*10);
setInterval(function(){
var d = new Date();
d.setDate(d.getDate() - 1);
checkResults(d, 'ka');
}, 60000*60);

//app.use('/api', authCheck);
app.use('*', addUser)
app.use('/submit', authCheck);

app.use('/api', index);
app.use('/submit', submit);
app.use('/login', login);

app.use('/sitemap.xml', function (req, res, next){
  res.sendFile(__dirname + 'client/build/sitemap.xml')
})

app.get('*', (req, res) => {
  console.log('url', req.url)
  match(
    { routes, location: req.url },
    (err, redirectLocation, renderProps) => {
      // in case of error display the error message
      if (err) {
        console.log('err')
        return res.status(500).send(err.message);
      }

      // in case of redirect propagate the redirect to the browser
      if (redirectLocation) {
        return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      }

      // generate the React markup for the current route
      let markup, helmet
      if (renderProps) {
        // if the current route matched we have renderProps
        markup = renderToString(<RouterContext {...renderProps}/>);
        helmet = Helmet.renderStatic();
      } else {
        // otherwise we can render a 404 page
        markup = renderToString(<NotFoundPage />);
        helmet = Helmet.renderStatic();
        res.status(404);
      }

      // render the index template with the embedded React markup
      return res.render('index', { markup, helmet });
    }
  );
});


// catch 404 and forward to error handler
//app.use('*', function (req, res, next) {
  //res.sendFile(__dirname + '/client/build/index.html')
//});

// error handler
/* app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});  */

module.exports = app;
