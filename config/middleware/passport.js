var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');

//Load User Model

//var //should have link to sql;

module.exports = function(passport) {
  passport.use(
      new LocalStrategy({ usernameField: 'email'},(email,password,done)=>{
          //Match User
      })
  )  
}
