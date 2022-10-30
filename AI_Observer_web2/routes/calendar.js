var express = require('express');
var router = express.Router();
var calendarController = require('../controller/calendarController')

/* GET home page. */
router.get('/', calendarController.calendar)

module.exports = router;