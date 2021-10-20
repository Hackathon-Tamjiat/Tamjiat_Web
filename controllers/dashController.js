var express = require('express');
var CropDAO = require('../models/CropDAO');
var DashDAO = require('../models/DashDAO');
var weather = require('../models/weather');
var dayjs = require('dayjs');
const request = require("request");
const https = require("https");
const fs = require("fs");
const querystring = require('querystring');
require('dotenv').config({ path : ".env" });

//파라미터값에 해당하는 위치의 작물 개수값
function dash_cropCategoryCount(req, res, next) {
    var parameters = {
        "uid": req.body.uid //req.body.uid
    }
    CropDAO.select_cropCategoryCount(parameters).then((db_data) => {
        res.send(db_data);
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dash_cropNumber(req, res, next) {
    var parameters = {
        "uid": req.body.uid //req.body.uid
    }
    //console.log(parameters.uid);
    CropDAO.select_totalCropnumber(parameters).then(function (db_data) {
        console.log(db_data)
        res.json(db_data)
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dash_cropWeekDate(req, res, next) {
    var parameters = {
        "uid": req.body.uid //req.body.uid
    }
    //console.log(parameters.uid);
    CropDAO.select_recentDateWeek(parameters).then(function (db_data) {
        console.log(db_data)
        res.json(db_data)
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dash_cropPercent(req, res, next) {
    var parameters = {
        "uid": req.body.uid,
        "cropsName": req.body.cropsName
    }
    var lat = req.body.lat;
    var lon = req.body.lon;
    //console.log(parameters.uid);
    CropDAO.select_cropPercent(parameters).then((db_data) => {
        console.log(db_data)
        weather.getWeatherAPI(lat, lon).then((body) => {
            let info = JSON.parse(body);
            console.log('현재 온도: ' + info['current']['temp']);
            console.log('현재 습도: ' + info['current']['humidity']);
            console.log('현재 풍속: ' + info['current']['wind_speed']);

            const weather = new Object();
            weather.temp = Math.ceil(info['current']['temp'])
            weather.humidity = Math.ceil(info['current']['humidity'])
            weather.windSpeed = Math.ceil(info['current']['wind_speed'])
            res.send({"cropPercent": db_data, "weather": weather})

        }).catch(err => res.send("<script>alert('weather err')</script>"));
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dash_cropDetail(req, res, next) {
    var parameters = {
        "uid": req.body.uid
    }
    //console.log(parameters.uid);
    CropDAO.select_cropDetail(parameters).then(function (db_data) {
        console.log(db_data)
        res.json(db_data)
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dash_cropCategory(req, res, next) {
    var parameters = {
        "uid": req.body.uid
    }
    CropDAO.select_cropCategory(parameters).then(function (db_data) {
        res.json(db_data)
    }).catch(err => res.send("<script>alert('err')</script>"));
}

//대쉬보드 메인페이지
function dash_main(req, res, next) {
    var parameters = {
        "uid": req.session.userid,
    }
    console.log(parameters.year)
    var key = process.env.KAKAO_MAP_API_KEY
    DashDAO.select_dashMenuList(parameters).then((db_data)=>{
        ListData = db_data;
        DashDAO.select_cropPercent(parameters).then((db_data)=>{
        PercentData = db_data
        DashDAO.select_dashcropFinish(parameters).then((db_data)=>{
            FinishData = db_data
            DashDAO.select_dashcropDisease(parameters).then((db_data)=>{
                DiseaseData = db_data
                DashDAO.select_dashDonut(parameters).then((db_data)=>{
                    DonutData = db_data
                    DashDAO.select_dashBar(parameters).then((db_data)=>{
                        BarData = db_data
                            DashDAO.select_dashCurve(parameters).then((db_data)=>{
                                CurveData = db_data
                                res.render('dash/main',{ListData, PercentData, FinishData, DiseaseData, DonutData, BarData, CurveData, username : req.session.userName,userimg:req.session.img, key:key});
                        }).catch(err=>res.send("<script>alert('err')</script>"));
                    }).catch(err=>res.send("<script>alert('err')</script>"));
                }).catch(err=>res.send("<script>alert('err')</script>"));
            }).catch(err=>res.send("<script>alert('err ')</script>"));
            }).catch(err=>res.send("<script>alert('err')</script>"));
        }).catch(err=>res.send("<script>alert('err')</script>"));
    }).catch(err=>res.send("<script>alert('err')</script>"));
}

function dashCrop(req, res, next) {
    var parameters = {
        "uid": req.session.userid
    }
    DashDAO.select_crop(parameters).then((db_data) => {
        res.render('dash/Crop', {
            db_data: db_data,
            c_num: req.params.num,
            max_value: 9,
            username: req.session.userName,
            userimg:req.session.img        
        });
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dashCropAdd(req, res, next) {
    DashDAO.select_cropCode().then((db_data) => {
        codeData = db_data
        DashDAO.select_cropCategory().then((db_data) => {
            categoryData = db_data
            var key = process.env.KAKAO_MAP_API_KEY
            res.render('dash/Crop_add', {codeData, categoryData, username: req.session.userName,userimg:req.session.img, key: key});
        }).catch(err => res.send("<script>alert('err')</script>"));
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dashCropUpdate(req, res, next) {
    var parameters = {
        "cid": req.params.num,
        "uid": req.session.userid
    }
    DashDAO.select_cropDetail(parameters).then((db_data) => {
        res.render('dash/Crop_update', {codeData, categoryData, db_data, username: req.session.userName, userimg:req.session.img});
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dashCropDetail(req, res, next) {
    var parameters = {
        "cid": req.params.num,
        "uid": req.session.userid
    }
    DashDAO.select_cropCode().then((db_data) => {
        codeData = db_data
        DashDAO.select_cropCategory().then((db_data) => {
            categoryData = db_data
            DashDAO.select_cropDetail(parameters).then((db_data) => {
                res.render('dash/Crop_detail', {codeData, categoryData, db_data, username: req.session.userName, userimg:req.session.img});
            }).catch(err => res.send("<script>alert('err')</script>"));
        }).catch(err => res.send("<script>alert('err')</script>"));
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dashinsertCrop(req, res, next) {
    parameters = {
        "cropsName": req.body.Cropkind,
        "uid": req.session.userid,
        "cropsCultivar": req.body.CropName,
        "categoryName": req.body.CropcategoryName,
        "useCompost": req.body.useCompost,
        "locate": req.body.Croplocation,
        "cropsStart": req.body.cropsStart,
        "cropsEnd": req.body.cropsEnd,
        "goalYield": req.body.goalYield,
        "currentYield": req.body.currentYield,
        "cropsMemo": req.body.cropmemo,
        "send_lat":req.body.send_lat,
        "send_lng":req.body.send_lng
    }
    console.log(parameters.send_lat)
    console.log(parameters.send_lng)
    DashDAO.insert_crop(parameters).then((db_data) => {
        res.redirect('/dash/crop/1')
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dashCropPercent(req, res, next) {
    var parameters = {
        "uid": req.session.userid
    }
    DashDAO.select_cropPercent(parameters).then((db_data) => {
        res.render('dash/Crop_culture', {
            db_data: db_data,
            c_num: req.params.num,
            max_value: 5,
            username: req.session.userName,
            userimg:req.session.img
        });
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dashDCrop(req, res, next) {
    var parameters = {
        "uid": req.session.userid
    }
    DashDAO.select_dcrop(parameters).then((db_data) => {
        res.render('dash/DCrop', {db_data, d_num: req.params.num, max_value: 5, dayjs, username: req.session.userName,userimg:req.session.img});
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dashDCropAdd(req, res, next) {
    DashDAO.select_cropCode().then((db_data) => {
        codeData = db_data
        res.render('dash/DCrop_add', {codeData, username: req.session.userName,userimg:req.session.img});
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dashinsertDCrop(req, res, next) {
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }
    var file = req.file.filename
    parameters = {
        "cropsName": req.body.Cropkind,
        "uid": req.session.userid,
        "cropsCultivar": req.body.CropName,
        "cropsImage": req.file.filename,
        "cropsMemo": req.body.cropmemo,
        "AICheck": "진행중",
        "cdName": "검사중",
        "cduuid" : uuidv4()
    }
    DashDAO.insert_dcrop(parameters).then((db_data) => {
        
        console.log(file)
        var jdata = querystring.stringify({
                    'file_name': file,
                    'cduuid': parameters.cduuid
                })
        var options = {
                    method: 'POST',
                    hostname: "tamjiat.hopto.org",
                    port:5000,
                    path:"/ai_post",
                    agent: false,
                    headers : {
                        'Content-Type':'application/x-www-form-urlencoded',
                        'Content-Length': Buffer.byteLength(jdata)   
                    },
                     rejectUnhauthorized : false,
                     requestCert: true,
                     strictSSL: false,
                     json:true
            }
        var req = https.request(options, (res) => {
                res.setEncoding('utf-8');
                res.on('data', (d) => {
                    var resu = JSON.parse(d)
                  console.log(resu['result']);
                });
        });
        req.on('error', (e) => {
            console.error(e);
          });
        req.write(jdata)
        req.end();
        res.redirect('/dash/dcrop/1')
    });
}

function dashDCropDetail(req, res, next) {
    var parameters = {
        "uid": req.session.userid,
        "did": req.params.num
    }
    DashDAO.select_dcropDetail(parameters).then((db_data) => {
       
        res.render('dash/DCrop_detail', {db_data, username: req.session.userName,userimg:req.session.img})
    }).catch(err => res.send("<script>alert('err')</script>"));
}


function dashPest(req, res, next) {
    var parameters = {
        "uid": req.session.userid
    }
    DashDAO.select_cropDisease(parameters).then((db_data) => {
        res.render('dash/Pest', {db_data, p_num: req.params.num, max_value: 7, dayjs, username: req.session.userName,userimg:req.session.img});
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dashNotice(req, res, next) {
    DashDAO.select_notice().then((db_data) => {
        res.render('dash/notice', {db_data, n_num: req.params.num, max_value: 7, username: req.session.userName,userimg:req.session.img});
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dashNoticeDetail(req, res, next) {
    var parameters = {
        "nid": req.params.num
    }
    DashDAO.select_noticeDetail(parameters).then((db_data) => {
        res.render('dash/notice_detail', {db_data, userimg:req.session.img,username: req.session.userName});
    }).catch(err => res.send("<script>alert('err')</script>"));
}
function dashNoticeUpdate(req, res, next) {
    var parameters = {
        "nid": req.params.num
    }
    DashDAO.select_noticeDetail(parameters).then((db_data) => {
        res.render('dash/notice_update', {db_data, userimg:req.session.img,username: req.session.userName});
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dashNoticeInsert(req, res, next) {
    res.render('dash/notice_write', {userimg:req.session.img,username: req.session.userName});
}

function dashNoticeInsertData(req, res, next) {
    var parameters = {
        "nTitle": req.body.nTitle,
        "nContent": req.body.nContent,
        "nWriter": req.session.userName,
    }
    DashDAO.insert_notice(parameters).then((db_data) => {
        res.redirect('/dash/notice/1')
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function dashTalk(req, res, next) {
    res.render('dash/talk', {userimg:req.session.img,username: req.session.userName});
}

function dash_cropMulter(req, res, next) {
    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
    }
    parameters = {
        "cropsName": req.body.Cropkind,
        "uid": req.body.userid,
        "cropsCultivar": req.body.CropName,
        "cropsImage": req.files.myFile[0].filename,
        "AICheck": "진행중",
        "cdName": "검사중",
        "cropsMemo" : "메모가 없어요!",
        "cduuid":uuidv4()
    }
    DashDAO.insert_dcrop(parameters).then((db_data) => {
        var parameter = {
            "uid":parameters.uid,
            "cduuid":parameters.cduuid,
            "cropsImage": parameters.cropsImage,
        }
        var i = requestqwe(parameters.cropsImage, parameter.cduuid , function(test_re){
            parameter['result']= test_re
            DashDAO.select_appData(parameter).then((db_data)=>{
                console.log({"result":db_data[0]})
                res.send({"result":db_data[0]})
            })
        })
    });
}

function requestqwe(iName,iCduuid,callback){
        var jdata = querystring.stringify({
                    'file_name': iName,
                    'cduuid': iCduuid
                })
        var options = {
                    method: 'POST',
                    hostname: "tamjiat.hopto.org",
                    port:5000,
                    path:"/ai_post",
                    agent: false,
                    headers : {
                        'Content-Type':'application/x-www-form-urlencoded',
                        'Content-Length': Buffer.byteLength(jdata)   
                    },
                     rejectUnhauthorized : false,
                     requestCert: true,
                     strictSSL: false,
                     json:true
            }
        var req = https.request(options, (res) => {
                res.setEncoding('utf-8');
                res.on('data', (d) => {
                    var resu = JSON.parse(d)
                    callback(resu["result"]);
                });
        });
        req.on('error', (e) => {
            console.error(e);
          });
        req.write(jdata)
        req.end();
        return "test"
}

function dashHeader(req, res, next) {
    const weathers = new Object();
    var avgPercent = 0
    var nearHavestDate = ""
    var totalYieldPercent = ""
    var totalDiseaseCount = 0
    var damagedCropsCount = 0
    var pestoutbreakCount = 0
    var lat = 0
    var lon = 0
    var parameters = {
        "userid": req.session.userid,
        "cropsName": req.body.cropsName
    }
    var pestData = {
        "cropsDate" : 0,
        "count": 0
    }
    console.log("dash header 진입")
    console.log(req.body.cropsName)
    DashDAO.select_userLocate(parameters).then(function (db_data) {
        var parameterLocate = {
            "locate": db_data[0].locate
        }
        console.log(db_data[0].locate)
        weathers.locate = db_data[0].locate
        DashDAO.select_userLatLon(parameterLocate).then(function (db_data) {
            lat = db_data[0].latitude
            lon = db_data[0].longitude
            console.log(lat)
            console.log(lon)
            DashDAO.select_totalGrowPercent(parameters).then(function (db_data) {
                var totalPercent = 0
                //선택 농작물 총 성장률 구하기
                db_data.forEach(element => {
                    totalPercent += element.percent;
                });
                avgPercent = Math.round((totalPercent / db_data.length) * 100) / 100
                //가장 가까운 작물 수확예정일
                DashDAO.select_nearHarvestDate(parameters).then(function (db_data) {
                    nearHavestDate = db_data[0].cropsEnd;
                    //작물별 총 수확 진행률
                    DashDAO.select_totalYieldPercent(parameters).then(function (db_data) {
                        console.log(db_data[0].avgYield)
                        totalYieldPercent = db_data[0].avgYield;
                        //작물별 병 해충 발행건수 및 피해 농작물 종 개수
                        DashDAO.select_countDisease_totalCrops(parameters).then(function (db_data) {
                            if (db_data[db_data.length - 1] == undefined) {
                                totalDiseaseCount = 0
                                damagedCropsCount = 0
                            } else {
                                totalDiseaseCount = db_data[db_data.length - 1].result
                                damagedCropsCount = db_data.length - 1
                            }
                            DashDAO.select_countDisease_date(parameters).then(function(db_data){
                                if(db_data == []){
                                    pestoutbreakCount = pestData
                                }else {
                                    pestoutbreakCount = db_data
                                }
                                weather.getWeatherAPI(lat, lon).then((body) => {
                                    let info = JSON.parse(body);
                                    weathers.temp = Math.ceil(info['current']['temp'])
                                    if (info['daily'][0]['rain'] === undefined) {
                                        weathers.rain = 0
                                    } else {
                                        weathers.rain = info['daily'][0]['rain']
                                    }
                                    weathers.windSpeed = Math.ceil(info['current']['wind_speed'])

                                    var headerInfo = {
                                        "avgPercent": avgPercent,
                                        "nearHavestDate": nearHavestDate,
                                        "totalYieldPercent": totalYieldPercent,
                                        "totalDiseaseCount": totalDiseaseCount,
                                        "damagedCropsCount": damagedCropsCount,
                                        "pestoutbreakCount": pestoutbreakCount,
                                        "locate": weathers.locate,
                                        "temp": weathers.temp,
                                        "rain": weathers.rain,
                                        "windspeed": weathers.windSpeed
                                    }
                                    res.send({"result": headerInfo})
                                }).catch(err => res.send("<script>alert('weather err')</script>"));
                            }).catch(err => res.send("<script>alert('select err')</script>"));
                        }).catch(err => res.send("<script>alert('err')</script>"));
                    }).catch(err => res.send("<script>alert('err')</script>"));
                }).catch(err => res.send("<script>alert('err')</script>"));
            }).catch(err => res.send("<script>alert('err')</script>"));
        }).catch(err => res.send("<script>alert('err')</script>"));
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function getWayWeather(req, res, next) {
    var parameters = {
        "lat": req.body.lat,
        "lon": req.body.lon
    }
    const weathers = new Object();

    weather.getWeatherAPI(parameters.lat, parameters.lon).then((body) => {
        let info = JSON.parse(body);

        weathers.temp = Math.ceil(info['current']['temp'])
        if (info['daily'][0]['rain'] === undefined) {
            weathers.rain = 0
        } else {
            weathers.rain = Math.ceil(info['daily'][0]['rain'])
        }
        weathers.windSpeed = Math.ceil(info['current']['wind_speed'])

        var headerInfo = {
            "temp": weathers.temp,
            "rain": weathers.rain,
            "windspeed": weathers.windSpeed
        }

        res.send({"result": headerInfo})
    }).catch(err => res.send("<script>alert('weather err')</script>"));
}

function dashLocation(req, res, next) {
    var parameters = {
        "uid": req.session.userid
    }
    DashDAO.select_cropDisease(parameters).then((db_data) => {
        res.render('dash/location', {db_data, p_num: req.params.num, max_value: 7, dayjs, userimg:req.session.img, username: req.session.userName});
    }).catch(err => res.send("<script>alert('err')</script>"));
}


function dashcropFinish(req, res, next) {
    var parameters = {
        "uid": req.session.userid,
        "cid":req.body.cid
    }
    DashDAO.update_dashcropFinish(parameters).then((db_data) => {
        res.redirect('/dash')
    }).catch(err => res.send("<script>alert('err')</script>"));
}
function dashcropFinish(req, res, next) {
    var parameters = {
        "uid": req.session.userid,
        "cid":req.body.cid
    }
    DashDAO.update_dashcropFinish(parameters).then((db_data) => {
        res.redirect('/dash')
    }).catch(err => res.send("<script>alert('err')</script>"));
}
function dashCropDelete(req, res, next) {
    var parameters = {
        "uid": req.session.userid,
        "cid":req.body.cid
    }
    DashDAO.delete_crop(parameters).then((db_data) => {
        res.redirect('/dash/crop/1')
    }).catch(err => res.send("<script>alert('err')</script>"));
}
function dashDCropDelete(req, res, next) {
    var parameters = {
        "uid": req.session.userid,
        "did":req.body.did
    }
    DashDAO.delete_dcrop(parameters).then((db_data) => {
        res.redirect('/dash/dcrop/1')
    }).catch(err => res.send("<script>alert('err')</script>"));
}
function dashNoticeDelete(req, res, next) {
    var parameters = {
        "uid": req.session.userid,
        "nid":req.body.nid
    }
    DashDAO.delete_notice(parameters).then((db_data) => {
        res.redirect('/dash/notice/1')
    }).catch(err => res.send("<script>alert('err')</script>"));
}

function cropLocation(req, res, next){
    var parameters = {
        "uid": req.session.userid
    }
    DashDAO.select_userLocateCrop(parameters).then((db_data) =>{
        CropLocations = db_data
        if(db_data.length == 0) {
            console.log("false")
            res.send("<script>alert('농작물이 없습니다. 농작물을 추가 해 주세요 ^^');document.location.href='/dash/cropadd'</script>")
        }else {
            var key = process.env.KAKAO_MAP_API_KEY
            console.log("true")
            res.render('dash/location', {CropLocations, userimg:req.session.img, username: req.session.userName, key: key});
        }
    })
}
  	
module.exports = {
    dash_cropCategoryCount,
    dash_main,
    dash_cropWeekDate,
    dash_cropNumber,
    dash_cropPercent,
    dash_cropDetail,
    dash_cropCategory,
    dash_cropMulter,
    dashCrop,
    dashCropAdd,
    dashCropUpdate,
    dashCropDetail,
    dashCropDelete,
    dashCropPercent,
    dashinsertCrop,
    dashDCrop,
    dashDCropAdd,
    dashDCropDetail,
    dashDCropDelete,
    dashinsertDCrop,
    dashNotice,
    dashNoticeDetail,
    dashNoticeDelete,
    dashNoticeUpdate,
    dashNoticeInsert,
    dashNoticeInsertData,
    dashPest,
    dashTalk,
    dashHeader,
    getWayWeather,
    dashLocation,
    dashcropFinish,
    cropLocation
}
