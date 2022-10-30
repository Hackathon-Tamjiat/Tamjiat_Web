var express = require('express');
var router = express.Router();
var marketobController = require('../controller/marketobController')

/* GET home page. */
router.get('/', marketobController.market_observer)
router.get('/data', marketobController.market_observer_data)
router.get('/map', marketobController.market_observer_map) 

module.exports = router;