const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys')
const User = require('../models/user')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
	new GoogleStrategy({
    callbackURL: '/auth/google/redirect',
		clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
	},
	(accessToken, refreshToken, profile, done) => {
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if(currentUser) {
        console.log('current user: ' + currentUser)
        done(null, currentUser)
      } else {
        new User({
          username: profile.displayName,
          googleId: profile.id,
          picture: profile.photos[0].value
        }).save().then((newUser) => {
          console.log('User saved ' + newUser)
          done(null, newUser)
        })
      }
    })
  })
);
