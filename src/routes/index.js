const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/singup', (req, res, next) => {
  res.render('singup');
});

router.post('/singup', passport.authenticate('local-singup', {
  successRedirect: 'singin',
  failureRedirect: 'signup',
  failureFlash: true
}));

router.get('/singin', (req, res, next) => {
  res.render('singin');
});

router.post('/singin', (req, res, next) => {
  res.send('logueado');
});

module.exports = router;
