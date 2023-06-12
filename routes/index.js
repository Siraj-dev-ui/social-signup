'use strict';

const express = require('express');
const passport = require('passport');
const router = express.Router();

// facebook and google

router.get('/', (req, res, next) => {
  const { user } = req;
  console.log('in the user : ', user);
  res.render('home', { user });
});

// google
router.get(
  '/login/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) return next(err);
    res.redirect('/');
  });
  // req.logout();
});

router.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
  }
);

// facebook routes
router.get('/login/facebook', passport.authenticate('facebook'));

// router.get('/logout', (req, res, next) => {
//   req.logout();
//   res.redirect('/');
// });

router.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  (req, res, next) => {
    res.redirect('/');
  }
);

module.exports = router;
