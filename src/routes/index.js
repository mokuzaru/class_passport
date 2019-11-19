const router = require('express').Router();
const passport = require('passport');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/singup', (req, res, next) => {
  res.render('singup');
});

router.post('/singup', passport.authenticate('local-singup', {
  successRedirect: '/wall',
  failureRedirect: '/singup',
  failureFlash: true
}));

router.get('/singin', (req, res, next) => {
  res.render('singin');
});

router.post('/singin', passport.authenticate('local-signin', {
  successRedirect: '/wall',
  failureRedirect: '/singin',
  failureFlash: true
}));
/*4*/
router.get('logout', (req, res, next) =>{
  req.logout();
  res.redirect('/');
});
/*6*/
/* para autentificar todas las siguientes rutas usamos un middleware, en wal quitar el auth*/

router.use((req, res , next) => {
    isAuth(req,res,next);
    next();
});

/*3*/
router.get('/wall', isAuth, (req, res, next) => {
  res.render('wall');
});

/*5*/

function isAuth(req, res ,next) {
  if(req.isAuthenticated()){
    return next();
  }
    res.redirect('/');
};
module.exports = router;
