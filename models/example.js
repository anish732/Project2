// module.exports = function(sequelize, DataTypes) {
//     var Example = sequelize.define("Example", {
//       text: DataTypes.STRING,
//       description: DataTypes.TEXT
//     });
//     return Example;
//   };
// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var sequelize = require('../config/connection');
var Sequelize = require('sequelize');
var bcrypt = require("bcryptjs");
// Creating our User model
var User = sequelize.define("user", {
  // The email cannot be null, and must be a proper email before creation
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  // The password cannot be null
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, { timestamps: false });

User.sync();



module.exports = User;