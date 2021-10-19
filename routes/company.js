var express = require('express');
var router = express.Router();
var companyController = require('../controllers/companyController')

router.get('/',companyController.company);

module.exports = router
