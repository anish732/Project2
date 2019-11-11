var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var sequelize = require('sequelize');
var bcrypt = require('bcryptjs');
//var db = require('../models')

//Load User Model
var User = require('../../models/example')

//var //should have link to sql;

module.exports = function(passport) {
  passport.use(
      new LocalStrategy({ usernameField: 'email'},(email,password,done)=>{
          //Match User
          User.findOne({email:email}).then(user => {
            if(!user){
              return done(null,false, {message: 'That email is not registered'});
            }
            //Match password
            bcrypt.compare(password, user.password, (err,isMatch) => {
              if(err) throw err;

              if(isMatch) {
                return done(null, user);
              }else {
                return (null, false, {message: 'Passoward incorrect'})
              }
            });
          })
            .catch(err => console.log(err));
      })
  );
  passport.serializeUser((user, cb) => {
    cb(null, user);
  });
  passport.deserializeUser(function(obj, cb) {
    //User.findById(id, function(err, user)   {
      cb(null, obj);
    
  });
}
