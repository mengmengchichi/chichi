var express = require('express');
var router = express.Router();
var Billservice = require('../services/bill_service.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/insert',Billservice.insert);

router.get('/load',Billservice.find);

router.get('/update',Billservice.update);

router.get('/remove',Billservice.remove);

router.get('/select',Billservice.selectBill);

module.exports = router;
