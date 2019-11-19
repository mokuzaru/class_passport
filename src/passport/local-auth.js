const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user.js');

/* 1 */
passport.serializeUser((user, done) => {
  done(null, user.id);
});
/* 1 */
/* 2 */
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done (null,user);
});
/* 2 */
passport.use('local-singup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({'email': email})
  console.log(user)
  if(user) {
    done (null, false, req.flash('singupMessage', 'Already taken'));
  } else {
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.encryptPassword(password);
    console.log(newUser);
    await newUser.save();
    done(null, newUser);
  }
}));

passport.use('local-signin', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    return done(null, false, req.flash('singinMessage', 'No User Found'));
  }
  if(!user.comparePassword(password)) {
    return done(null, false, req.flash('singinMessage', 'Incorrect Password'));
  }
  return done(null, user);
}));
