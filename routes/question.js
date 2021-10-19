var express = require('express');
var router = express.Router();
var questionController = require('../controllers/questionController')

router.get('/',questionController.question);

module.exports = router