var express = require('express');
var router = express.Router();
var { ensureAuthenticated } = require('../config/middleware/isAuthenticated')

// Welcome Page
router.get('/',(req,res)=> res.render('Welcome'));
// Dashboard
router.get('/dashboard', ensureAuthenticated, (req,res)=> 
res.render('dashboard', {
    name: req.user.name
}));


module.exports = router;