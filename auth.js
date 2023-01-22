const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET_ID,
    callbackURL: process.env.GOOGLE_CALLBACK
  },
  function(accessToken, refreshToken, profile, cb) {
      return cb(null, profile);
  }
));

passport.serializeUser(function(user,done) {
    done(null,user);
})
passport.deserializeUser(function(user,done) {
    done(null,user);
})