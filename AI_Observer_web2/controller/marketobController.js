var express = require('express');
var fishobDAO = require('../models/fishobDAO')

function market_observer(req,res, next) {res.render('market_observer')}
function market_observer_data(req,res, next) {res.render('market_observer_data')}
function market_observer_map(req,res, next) {
    fishobDAO.select_ship().then((db_data) => {
        ShipData = db_data

        var shipName = [];
        var shipLat = [];
        var shipLon = [];


        for(var data of db_data)
        {
            shipName.push(data.name)
            shipLat.push(data.lat)
            shipLon.push(data.lon)
        }
        res.render('market_observer_map', {shipName, shipLat, shipLon})
    }).catch(err => res.send("<script>alert('Ship Map Data err')</script>"));
}
module.exports = {
    market_observer,
    market_observer_data,
    market_observer_map
}