// server.js
// load the things we need
const express = require('express');
const app = express();
const mysql = require('mysql');

// IMPORT DE MON ROUTEUR
var paris = require('./routes/paris');
var index = require('./routes/index')
var users = require('./routes/users')

app.use(express.static(__dirname + '/public'));

/**
 * This middleware provides a consistent API
 * for MySQL connections during request/response life cycle
 */
var myConnection  = require('express-myconnection')

 
app.set('view engine', 'ejs');


/**
 * Express Validator Middleware for Form Validation
 */
var expressValidator = require('express-validator')
app.use(expressValidator())


/**
 * body-parser module is used to read HTTP POST data
 * it's an express middleware that reads form's input
 * and store it as javascript object
 */
var bodyParser = require('body-parser')
/**
 * bodyParser.urlencoded() parses the text as URL encoded data
 * (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body.
 */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


/**
 * This module let us use HTTP verbs such as PUT or DELETE
 * in places where they are not supported
 */
var methodOverride = require('method-override')

/**
 * using custom logic to override method
 *
 * there are other ways of overriding as well
 * like using header & using query value
 */
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

/**
 * This module shows flash messages
 * generally used to show success or error messages
 *
 * Flash messages are stored in session
 * So, we also have to install and use
 * cookie-parser & session modules
 */
var flash = require('express-flash')
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser('keyboard cat'))
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true,
	cookie: { maxAge: 60000 }
}))
app.use(flash())

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.use('/', index)
app.use('/users', users)
app.use ('/paris', paris)
// app.use('/administration', config)


app.get('/paris', function(req, res) {
    res.render('pages/paris');
});

// "Je rentre dans l'arêne //
app.post('/quotes', (req, res) => {
  console.log('vous êtes inscris!')
})



// about page
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// profil page
app.get('/profil', function(req, res) {
    res.render('pages/profil');
});

// Administration

app.get('/administration', (req, res, next) => {
    res.render('administration');
});

app.get('/administration/dashboard', (req, res, next) => {
    res.render('dashboard');
});

// game
app.get('/game/:id(\\d+)', function(req, res) {
    res.render('pages/game');
});
app.get('/game', function(req, res) {
    res.render('pages/game');
});

app.listen(3000);
console.log('3000 is the magic port');
