var express = require('express');

function calendar(req,res, next) {res.render('calendar')}

module.exports = {
    calendar
}