var express = require('express');

function memo(req,res, next) {res.render('memo')}

module.exports = {
    memo
}