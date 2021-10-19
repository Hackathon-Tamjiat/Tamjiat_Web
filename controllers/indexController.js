var express = require('express');
var crop = require('../models/CropDAO');


function loginSuccess(req, res, next) {
	res.render('business');
}

function loginFail(req, res, next) {
	res.render('business');
}

function cropNumber(req, res, next) {
    var parameters = {
        "uid": req.body.uid //req.body.uid
    }
    //console.log(parameters.uid);
    crop.select_totalCropnumber(parameters).then(function (db_data){
        console.log(db_data)
        res.json(db_data)
    }).catch(err=>res.send("<script>alert('err')</script>"));
}

function cropWeekDate(req, res, next) {
    var parameters = {
        "uid": req.body.uid //req.body.uid
    }
    //console.log(parameters.uid);
    crop.select_recentDateWeek(parameters).then(function (db_data){
        console.log(db_data)
        res.json(db_data)
    }).catch(err=>res.send("<script>alert('err')</script>"));
}

function getIndex(req, res, next) {
    var token = req.user;
    if (token == undefined) {
        res.render('index',{username : token});
    }
    else {
        res.render('index',{username : req.session.userName})
    }
}

function passport_auth(req, res, next) {
    passport.authenticate('local-login', {
        successRedirect : '/loginSuccess',
        failureRedirect : '/loginFail',
        failureFlash : true
    })
}

function policy(req, res, next) {
	res.render('policy',{userimg:req.session.img,username : req.session.userName}) 
}

module.exports = {
    loginFail,
    loginSuccess,
    getIndex,
    passport_auth,
    cropNumber,
    cropWeekDate,
    policy
}
