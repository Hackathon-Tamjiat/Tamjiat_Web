var express = require('express');
var router = express.Router();
var noticeController = require('../controller/noticeController')

/* GET home page. */
router.get('/', noticeController.notice)
router.get('/write', noticeController.notice_write)
router.get('/detail', noticeController.notice_detail)

module.exports = router;