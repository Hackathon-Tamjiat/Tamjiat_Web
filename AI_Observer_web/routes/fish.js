var express = require('express');
var router = express.Router();
var fishController = require('../controller/fishController')

/* GET home page. */
router.get('/', fishController.fish_collect)

module.exports = router;