var express = require('express');
var router = express.Router();
const upload = require('../middleware/multer');
var dashController = require('../controllers/dashController')
var weatherController = require('../controllers/weatherController')

//안드로이드-----------------------------------------
router.post('/crop', dashController.dash_cropCategoryCount);
router.post('/cropNum',dashController.dash_cropNumber);
router.post('/cropWeek',dashController.dash_cropWeekDate);
router.post('/cropPercent', dashController.dash_cropPercent);
router.post('/cropDetail', dashController.dash_cropDetail);
router.post('/cropCategory', dashController.dash_cropCategory);

router.post('/cropMulter', upload.fields([{name:'myFile', maxCount:1}]), dashController.dash_cropMulter)


//웹------------------------------------------------
router.get('/',dashController.dash_main);
router.get('/crop/:num',dashController.dashCrop);
router.get('/cropAdd',dashController.dashCropAdd);
router.get('/cropUpdate',dashController.dashCropUpdate);
router.get('/cropDetail/:num',dashController.dashCropDetail);
router.post('/cropInsert',dashController.dashinsertCrop);

router.post('/cropDelete',dashController.dashCropDelete);

router.get('/dcrop/:num',dashController.dashDCrop);
router.get('/dcropAdd', dashController.dashDCropAdd);
router.get('/dcropDetail/:num',dashController.dashDCropDetail);
router.post('/dcropInsert',upload.single('file'), dashController.dashinsertDCrop);
router.post('/dcropDelete',dashController.dashDCropDelete);

router.get('/cropCulture/:num', dashController.dashCropPercent);
router.get('/pest/:num',dashController.dashPest);

router.get('/notice/:num',dashController.dashNotice);
router.get('/noticeDetail/:num',dashController.dashNoticeDetail);
router.get('/noticeUpdate',dashController.dashNoticeUpdate);
router.get('/noticeInsert',dashController.dashNoticeInsert);
router.post('/noticeInsert',dashController.dashNoticeInsertData);
router.post('/noticeDelete',dashController.dashNoticeDelete);

router.get('/talk',dashController.dashTalk);
router.get('/location', dashController.cropLocation);
router.post('/cropFinish',dashController.dashcropFinish);

router.post('/Header',dashController.dashHeader);
router.post('/getWayWeather',dashController.getWayWeather);

router.get('/weather/today',weatherController.todayWeather);




module.exports = router
