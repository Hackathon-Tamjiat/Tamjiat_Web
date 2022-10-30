var express = require('express');

function matters(req,res, next) {res.render('matters_inquiry')}

module.exports = {
    matters
}