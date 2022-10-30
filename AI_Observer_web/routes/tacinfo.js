var express = require('express');
var router = express.Router();
var tacinfoController = require('../controller/tacinfoController')

/* GET home page. */
router.get('/', tacinfoController.tac_info)
router.get('/policy', tacinfoController.tac_info_policy)
router.get('/person', tacinfoController.tac_info_person)

module.exports = router;