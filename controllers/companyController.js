var express = require('express');

function company(req, res, next) {
	res.render('company',{userimg:req.session.img,username : req.session.userName});
}

module.exports = {
    company
}