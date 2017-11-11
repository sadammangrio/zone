const passport = require("passport");
var express = require('express');
var router = express.Router();

module.exports = app => {
  //redirect user to Google OAuth. Get use profile and Email.
  app.get('/auth/google',
  passport.authenticate('google', { scope: 
  	[ 'https://www.googleapis.com/auth/plus.login',
  	, 'https://www.googleapis.com/auth/plus.profile.emails.read' ] }
));

  //Handle the callback from google.
   app.get( '/auth/google/callback', 
    passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/login'
   }));

  app.get('/logout', (req, res) => {
    req.session.destroy(function(e){
      req.logout();
      res.redirect('/');
    });
  });

}
