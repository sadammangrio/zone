const GoogleStrategy = require("passport-google-oauth20").Strategy;
import keys from '../config/keys'

//Google OAuth Strategy configuration
module.exports = function(passport, User) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: keys.googleClientID,
        clientSecret: keys.googleClientSecret,
        callbackURL: "/auth/google/callback"
      }, //when user call back get necessary info and prepare these to save in DB
      async (accessToken, refreshTocken, profile, done) => {
        //Check that User already in Database or not.
        const existingUser = await User.findOne({ googleId: profile.id });
          
        if (existingUser) {
            return done(null, existingUser);
        } 

        const user = await new User({
          googleId: profile.id,
          email: profile.emails[0].value,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          gender: profile.gender})
          .save();
          done(null, user);
        }
      ) 
    );
  }