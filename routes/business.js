var express = require('express');
var router = express.Router();
var businessController = require('../controllers/businessController')

router.get('/',businessController.business);

module.exports = router
