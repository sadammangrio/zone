import passport from "passport"
import mongoose from "mongoose"
const User = mongoose.model("users");

module.exports = app => {

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById().then(user => {
      done(null, user);
    });
  });

  require('./passportGoogle')(passport, User);

  app.use(passport.initialize());
  app.use(passport.session());
}