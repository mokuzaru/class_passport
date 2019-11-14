const express = require('express');
const path = require('path');
const engine = require('ejs-mate');
const flash = require('connect-flash');
const passport = require('passport');
const morgan = require('morgan');
const session = require('express-session');

//Inicializadores
const krowdy = express();
require('../database');
require('./passport/local-auth');

//Settings
krowdy.set('port', process.env.PORT || 3000);
krowdy.set('views', path.join(__dirname, 'views'));
krowdy.engine('ejs', engine);
krowdy.set('view engine', 'ejs');

//middlewares
krowdy.use(morgan('dev'));
krowdy.use(express.urlencoded({extended: false}));
krowdy.use(express.json());
krowdy.use(session({
  secret: 'session1',
  resave: false,
  saveUninitialized: false
}));
krowdy.use(flash());
krowdy.use(passport.initialize());
krowdy.use(passport.session());

//routes
krowdy.use('/', require('./routes/index.js'));

//Starting server
krowdy.listen(krowdy.get('port'), () =>{
  console.log('Server listen at ', krowdy.get('port'));
})
