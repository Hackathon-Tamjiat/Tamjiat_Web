var express = require('express');
var router = express.Router();
var organiztionController = require('../controller/organiztionController')

/* GET home page. */
router.get('/', organiztionController.organiztion)

module.exports = router;