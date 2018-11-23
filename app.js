var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var passport = require('passport');
var flash = require('connect-flash');
var hbs = require('hbs');
var Donor = require("./models/donor");
var Charity = require("./models/charity");

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var exampleRouter = require('./routes/example');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var dashboardRouter = require('./routes/dashboard');

var app = express();
var mongoose = require('mongoose');
var mongoURI = process.env.APP_ENV == 'production' ? process.env.DB_PROD : process.env.DB_LOCAL;
mongoose.connect(mongoURI, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongo!');
});

app.use(require("express-session") ({
	secret: "not so secret",
	resave: false,
	saveUninitialized: false
}));

app.use(flash());
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// Can use this object throughout our views with {{currentUser}}
app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('hasProp', function(obj, prop, options) {
  console.log(obj[prop]);
  if(obj[prop] === undefined) {
    return options.inverse(this);
  }
  return options.fn(this);
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/example', exampleRouter);
app.use('/login', loginRouter);
app.use('/dashboard', dashboardRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
