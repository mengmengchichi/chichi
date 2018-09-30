var express = require('express');
var router = express.Router();
var Userservice = require('../services/user_service.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',Userservice.login)

router.post('/insert',Userservice.insert);

router.post('/update',Userservice.revise);

router.get('/load',Userservice.findAll);

router.get('/loadpage',Userservice.find);

module.exports = router;
