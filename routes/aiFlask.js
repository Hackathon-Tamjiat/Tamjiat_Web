var express = require('express');
var router = express.Router();
var aiFlaskController = require('../controllers/aiFlaskController')

router.post('/sendWebSImg',aiFlaskController.sendAFImg);

module.exports = router
