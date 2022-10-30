var express = require('express');

function notice(req,res, next) {res.render('notice')}
function notice_write(req,res, next) {res.render('notice_w')}
function notice_detail(req,res, next) {res.render('notice_d')}

module.exports = {
    notice,
    notice_write,
    notice_detail
}