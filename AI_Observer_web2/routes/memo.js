var express = require('express');
var router = express.Router();
var memoController = require('../controller/memoController')

/* GET home page. */
router.get('/', memoController.memo)

module.exports = router;