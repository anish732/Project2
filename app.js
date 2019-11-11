var express = require('express');
var expressLayouts = require('express-ejs-layouts');
var mysql = require('mysql');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport')
var app = express();
//var db = require("./models/data");

//Passport config
require('./config/middleware/passport')(passport);


var db = require('./config/connection')
//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
//Bodyparser
app.use(express.urlencoded({ extended: true }));

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
   res.locals.success_msg = req.flash('success_msg');
   res.locals.error_msg = req.flash('err_msg');
   res.locals.error = req.flash('err');
   next();
})

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));


var PORT = process.env.PORT || 5000;

app.listen(PORT,console.log(`Server started on port ${PORT}`));
