var express = require('express');

function question(req, res, next) {
	res.render('question',{userimg:req.session.img,username : req.session.userName });
}

module.exports = {
  question
}