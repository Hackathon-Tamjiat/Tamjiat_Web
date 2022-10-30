var express = require('express');
var router = express.Router();
var shipobController = require('../controller/shipobController')

/* GET home page. */
router.get('/', shipobController.ship_observer)
router.get('/data', shipobController.ship_observer_data)
router.get('/map', shipobController.ship_observer_map) 

module.exports = router;