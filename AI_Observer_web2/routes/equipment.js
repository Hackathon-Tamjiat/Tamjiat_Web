var express = require('express');
var router = express.Router();
var equipmentController = require('../controller/equipmentController')

/* GET home page. */
router.get('/', equipmentController.equipment)

module.exports = router;