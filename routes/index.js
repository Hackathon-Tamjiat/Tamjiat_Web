var express = require('express');
var passport = require('passport');
var KakaoStrategy = require('passport-kakao').Strategy;
var indexController = require('../controllers/indexController')
var weatherController = require('../controllers/weatherController')
var router = express.Router();

router.use('/auth', require('./auth')); //auth.js 연결

router.use('/weather/day', weatherController.getDayWeather); //weaher.js 연결

router.use('/weather/today', weatherController.todayWeather); //weaher.js 연결

router.get('/', indexController.getIndex)

router.post('/', indexController.passport_auth)

router.get('/loginSuccess', indexController.loginSuccess)

router.get('/loginFail',indexController.loginSuccess)

router.post('/total/cropNumber', indexController.cropNumber)

router.post('/total/cropDateWeek', indexController.cropWeekDate)


router.get('/policy', indexController.policy);
module.exports = router
