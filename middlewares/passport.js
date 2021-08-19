const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passport = require('passport');
/* const config = require("../utils/config"); */ //Importa modulo de APIKEYS y APISECRETS

passport.use(new GoogleStrategy({
  clientID: process.env.OAUTH2_CLIENT_ID,
  clientSecret: process.env.OAUTH2_CLIENT_SECRET,
  callbackURL: process.env.OAUTH2_CALLBACK
},  
function(req, accessToken, refreshToken, profile, done) {
    passport.deserializeUser(function(obj, done){
      done(null, obj);
    })
    if(profile.emails[0].value != undefined){
      passport.serializeUser(function(usr, done){
        done(null,{
            name: profile.displayName,
            email: profile.emails[0].value
        })
      });
      return done(null, true)
    } else {
      return done(null, false);
    }
  }
))

module.exports = passport;