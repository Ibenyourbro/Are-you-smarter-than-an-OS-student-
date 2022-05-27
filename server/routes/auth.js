const passport = require('passport');
const router = require('express').Router();
require('dotenv').config();
//uncomment for local testing. Remember to comment when pushing to main branch.
const CLIENT_URL = `${process.env.CLIENT_URL}`;//:${process.env.PORT}`;

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      message: 'success',
      success: true,
      user: req.user,
    });
  }
});
router.get('/login/fail', (req, res) => {
  res.status(400).redirect('/login');
});
router.get(
  '/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: CLIENT_URL,
    failureRedirect: '/login/fail',
  })
);
router.get('/logout', (req, res) => {
  req.logOut(() => {
    res.redirect(CLIENT_URL);
  });
  //req.session.destroy();
});

module.exports = router;
