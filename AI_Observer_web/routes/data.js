var express = require('express');
var router = express.Router();
var dataController = require('../controller/dataController')

/* GET home page. */
router.get('/', dataController.data_collect)

module.exports = router;