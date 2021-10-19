var express = require('express');
var weather = require('../models/weather');


function todayWeather(req, res, next) {
    var lat = req.query.lat;
    var lon = req.query.lon;

    weather.getWeatherAPI(lat,lon).then(function (body) {
        let info = JSON.parse(body);
        console.log("===================================");
        console.log('현재 온도: ' + info['current']['temp'] + '℃');
        console.log('현재 기상조건(ID) :  ' + info['current']['weather'][0]['id']);
        console.log('현재 날씨(ID):    ' + info['current']['weather'][0]['main']);
        console.log('날씨 아이콘 아이디:    ' + info['current']['weather'][0]['icon']);
        console.log("===================================");

        const weather = new Object();

        let weatherIcon = info['current']['weather'][0]['icon']; //날씨 아이콘 예외처리로 인해 코드가 길어질 것을 방지하기위해 변수 선언

        weather.currTemp = Math.ceil(info['current']['temp'])+ '℃';
        weather.currWeather = info['current']['weather'][0]['main'];
        weather.currWeatherIcon = (weatherIcon.indexOf("01") > -1 || weatherIcon.indexOf("02") > -1) ? weatherIcon : weatherIcon.replace(/[nd]/g, ""); // 날씨가 01 or 02이면 아이콘이 다르기 때문에 n을 붙이고 나머지는 n삭제
        
        console.log(weather);
        res.status(200).send({
            "message": "성공하였습니다",
            "result" : weather
        });
    }).catch(function (err){
        console.log(err);
        res.status(202).send({'message': err});
    })
}

function getDayWeather(req, res, next) {
    var lat = req.param('lat');
    var lon = req.param('lon');
    var inputDate = req.param('date');
    console.log('date:' + inputDate);
    console.log('lat:' + lat);
    console.log('lon:' + lon);

    weather.getWeatherAPI(lat,lon).then(function (body) {
        let info = JSON.parse(body);

        for(i in info['daily']){
            console.log("===================================");
            console.log('시간:  ' + info['daily'][i]['dt'] );
            console.log('온도: ' + info['daily'][i]['temp']['day'] + '℃');
            console.log('최저온도: ' + info['daily'][i]['temp']['min'] + '℃');
            console.log('최고온도: ' + info['daily'][i]['temp']['max'] + '℃');
            console.log('습도: ' + info['daily'][i]['humidity'] + '%');
            console.log('현재 자외선지수:  ' + info['daily'][i]['uvi']);
            console.log('현재 바람속도:   ' + info['daily'][i]['wind_speed'] + 'm/s');
            console.log('현재 강수량:    ' + info['daily'][i]['rain']);
            console.log('현재 기상조건(ID) :  ' + info['daily'][i]['weather'][0]['id']);
            console.log('현재 날씨(ID):    ' + info['daily'][i]['weather'][0]['main']);
            console.log('날씨 아이콘 아이디:    ' + info['daily'][i]['weather'][0]['icon']);
            console.log("===================================");
        }
    }).catch(function (err){
        console.log(err);
    })
}

module.exports = {
    todayWeather,
    getDayWeather
}