var express = require('express');
var router = express.Router();
var supplierservice = require('../services/supplierservice.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/insert',supplierservice.insert);


module.exports = router;
