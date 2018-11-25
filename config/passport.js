var LocalStrategy = require('passport-local').Strategy;

module.exports = function(passport) {
  passport.use('login', new LocalStrategy(
    function(username, password, done) {
      Donor.findOne({ username: username }, function(err, user) {
        if (err || user == null) {
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
              return done(null, user);
            }
          });
        } else {
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        }
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    Donor.findById(id, function(err, user) {
      if(err || user == null) {
        Charity.findById(id, function(err, user) {
          done(err, user);
        });
      } else {
        done(err, user);
      }
    });
  });
}
