var express = require('express');
var AAiFlask = require('../models/AAiFlask');

function sendAFImg(req, res, next) {
    req.connection.setTimeout(60 * 2 * 1000) // default timeout을 2분으로 변경

    var parameters = {
        "img": req.body.img //req.body.uid, base64 이미지 문자열
    }
    console.log("img 값:" + parameters.img)
    AAiFlask.sendImg(parameters).then(function (body){
        console.log(body)
        res.json(body)
        /*
            setTimeout(() =>{
                res.json(body)
            }, 2 * 60 * 1000) // 2분뒤에 send함함
        */
   }).catch(err=>res.send("<script>alert('err')</script>"));
}

module.exports = {
    sendAFImg
}
