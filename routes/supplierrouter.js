var express = require('express');
var router = express.Router();
var supplierservice = require('../services/supplierservice.js');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/insert',supplierservice.insert);

router.get('/load',supplierservice.find);

router.get('/update',supplierservice.update);

router.get('/remove',supplierservice.remove);

router.get('/select',supplierservice.selectSupplier);

module.exports = router;
