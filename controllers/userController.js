var express = require('express');
var userDao = require('../models/userDAO');

function signUp(req, res, next) {
    var parameters = {
        "id": req.session.userid,
        "name" : req.session.userName,
        "img" : req.session.img,
        "email": req.session.email,
        "token" : "0"
    }

    userDao.insert_userInfo(parameters).then(function (db_data){
        console.log(db_data)
        res.redirect('/')
    }).catch(err=>res.send("<script>alert('err')</script>"));

}

function updateUser(req, res, next) {

    var parameters = {
        "id": req.session.userid,
        "name" : req.session.userName,
        "img" : req.session.img,
        "email": req.session.email,
        "token" : "0"
    }

    userDao.update_userInfo(parameters).then(function (db_data){
        console.log(db_data)
        console.log("업데이트 성공");
        res.redirect('/')
    }).catch(err=>res.send("<script>alert('err')</script>"));

}

function findUser(req, res, next) {
    var parameters = {
        "id": req.session.userid
    }

    userDao.select_userFind(parameters).then(function (db_data){
        console.log(db_data)

        if(db_data.length == 0){
            console.log('존재하지 않는 회원입니다. 회원가입 라우터로 이동합니다.')
            res.redirect('/auth/signUpUser')
        }else{
            console.log('이미 존재하는 회원입니다.')
            res.redirect('/auth/updateUser')
        }
    }).catch(err=>res.send("<script>alert('err')</script>"));

}

function verificationUserInfo(req, res, next) {
    console.log(req.body)
    var parameters = {
        "id": req.body.userid,
        "name" : req.body.userName,
        "img" : req.body.img,
        "email" : req.body.email,
        "token" : "0"
    }

    var data = new Object();
    data.message = "로그인 성공"

    var sendJsonData = data // json string으로 하면 파싱불가 String으로 바뀜

    userDao.select_userFind(parameters).then(function (db_data){
        console.log(db_data)

        if(db_data.length == 0){
            console.log('존재하지 않는 회원입니다. 회원가입을 진행합니다.')
            userDao.insert_userInfo(parameters).then(function (db_data){
                console.log(db_data)
                res.json(sendJsonData)
            }).catch(err=>res.send("<script>alert('err')</script>"));
        }else{
            console.log('이미 존재하는 회원입니다.')
            userDao.update_userInfo(parameters).then(function (db_data){
                console.log("업데이트 성공");
                console.log("hello : "+sendJsonData)
                res.json(sendJsonData)
            }).catch(err=>res.send("<script>alert('err')</script>"));
        }
    }).catch(err=>res.send("<script>alert('err')</script>"));
}


module.exports = {
    signUp,
    findUser,
    updateUser,
    verificationUserInfo,
}