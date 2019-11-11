var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var passport = require('passport');
var User = require('../models/example');


//var db = require("../models");

//Login Page
router.get('/login',(req,res)=> res.render('login'));

// Register Page
router.get('/register',(req,res)=> res.render('Register'));

//Register Handle
router.post('/register',(req, res) => {
    console.log(req.body);
    var { name , email, password, password2} = req.body;
    var errors = [];
    //Check required fields
    if(!name || !email || !password || !password2) {
      errors.push({msg:'Please fill in all fields'});
    }
    //Check passwords match
    if(password !==password2) {
        errors.push({msg: 'Passwords do not match'});
    }
    //Check pass length
    if(password.length<3){
        errors.push({msg: 'Passoward should be at least 3 characters'});
    }

    if(errors.length>0){
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2  
      })
    }else{
        //Validation passed
        User.findOne ({ 
          where:{
            email: req.body.email}
          })
         .then(user => {
           if(user) {
             //User exists
             errors.push({ msg: 'Email is already registered'});
             res.render('register', {
               errors,
               name,
               email,
               password,
               password2
             });
           }else {
             var newUser = new User({
               name,
               email,
               password
             });
             //Hash Password
             bcrypt.genSalt(10, (err, salt) => 
             bcrypt.hash(newUser.password,salt,(err, hash) =>{
               if(err) throw err;
               //Set password to hashed
               newUser.password = hash;
               //Save user
               newUser
               .save()
               .then(user => {
                 req.flash('success_msg', 'You are now registered and you can login');
                 res.redirect('/users/login');
               })
               .catch(err => console.log(err));
             }))
           }
         });
    }
});

//login handle
router.post('/login', (req, res,next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

//Logout
router.get('/logout', (req, res) => {
  req.logOut();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
})

module.exports = router;