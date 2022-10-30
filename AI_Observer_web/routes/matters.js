var express = require('express');
var router = express.Router();
var mattersController = require('../controller/mattersController')

/* GET home page. */
router.get('/', mattersController.matters)

module.exports = router;