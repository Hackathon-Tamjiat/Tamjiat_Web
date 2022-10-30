var express = require('express');
var fishobDAO = require('../models/fishobDAO')

function ship_observer(req,res, next) {res.render('ship_observer')}
function ship_observer_data(req,res, next) {
    var ship_name = []
    var ship_number =[]
    var fish_type = []
    var fishing_type = []
    var ship_location = []

    Promise.all([fishobDAO.ship_info(),fishobDAO.fishyield()]).then((db_data) => {
        for(var i of db_data[0]){
            ship_name.push(i['ship_name'])
            if(i['ship_number']==null) {
                ship_number.push("")
            }else{ship_number.push(i['ship_number'])}
            fish_type.push(i['ship_fish'])
            fishing_type.push(i['ship_fishing'])
            ship_location.push(i['ship_location'])
        }
        console.log(db_data[1])
        res.render('ship_observer_data', {ship_name,ship_number,fish_type,fishing_type,ship_location})
    }).catch(err => 
        {console.log(err)
        res.send("<script>alert('Ship Map Data err')</script>")});
}

function ship_observer_map(req,res, next) {
    fishobDAO.select_ship().then((db_data) => {
        ShipData = db_data

        var shipName = [];
        var shipFishspecies = [];
        var shipLat = [];
        var shipLon = [];


        for(var data of db_data)
        {
            shipName.push(data.name)
            shipFishspecies.push(data.fish_type)
            shipLat.push(data.lat)
            shipLon.push(data.lon)
        }
        res.render('ship_observer_map', {shipName, shipFishspecies, shipLat, shipLon})
    }).catch(err => res.send("<script>alert('Ship Map Data err')</script>"));
}
module.exports = {
    ship_observer,
    ship_observer_data,
    ship_observer_map
}