var express = require('express');
var router = express.Router();
var shipController = require('../controller/shipController')

/* GET home page. */
router.get('/', shipController.ship)
router.get('/detail', shipController.ship_detail)
router.get('/detailan', shipController.ship_detail_an)

module.exports = router;