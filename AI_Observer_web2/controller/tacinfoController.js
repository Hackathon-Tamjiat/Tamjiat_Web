var express = require('express');

function tac_info(req,res, next) {res.render('tac_info')}
function tac_info_policy(req,res, next) {res.render('tac_info_policy')}
function tac_info_person(req,res, next) {res.render('tac_info_person')}

module.exports = {
    tac_info,
    tac_info_policy,
    tac_info_person
}