var express = require('express');

function business(req, res, next) {
	res.render('business',{userimg:req.session.img,username : req.session.userName});
}

module.exports = {
    business
}