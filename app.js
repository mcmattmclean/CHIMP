var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');
var passport = require('passport');
var Donor = require("./models/donor");
var Charity = require("./models/charity");

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var exampleRouter = require('./routes/example');
var registerRouter = require('./routes/register');
var loginRouter = require('./routes/login');

var app = express();
var mongoose = require('mongoose');
var mongoURI = process.env.APP_ENV == 'production' ? process.env.DB_PROD : process.env.DB_LOCAL;
mongoose.connect(mongoURI, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongo!');
});

// Passport config
app.use(passport.initialize());
app.use(passport.session());
var LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('local Strategy');
    Donor.findOne({ username: username }, function(err, user) {
      if (err) {
        Charity.findOne({ username: username }, function(err, user) {
          if(err) {
            return done(err);
          } else {
            if (!user) {
              return done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
              return done(null, false, { message: 'Incorrect password.' });
            }
          }
        });
      } else {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Donor.findById(id, function(err, user) {
    if(err) {
      Charity.findById(id, function(err, user) {
        done(err, user);
      })
    } else {
      done(err, user);
    }
  });
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

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register', registerRouter);
app.use('/example', exampleRouter);
app.use('/login', loginRouter);

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
