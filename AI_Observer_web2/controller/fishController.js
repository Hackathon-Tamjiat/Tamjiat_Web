var express = require('express');
var fishDAO = require('../models/fishDAO')

function fish_collect(req,res, next) {
    fishDAO.land_select().then((db_data)=>{
        var fish_num=[]
        var fish_date=[]
        var species=[]
        var fish_height=[]
        var fish_length=[]
        var fish_weight=[]
        var market_name=[]
        for(var i of db_data){
            fish_num.push(i.fish_num);
            fish_date.push(i.date);
            species.push(i.species);
            fish_height.push(i.height);
            fish_length.push(i.length);
            fish_weight.push(i.weight);
            market_name.push(i.market_name);
        }
        res.render('fish_collect',{fish_num,fish_date,species,fish_height,fish_length,fish_weight,market_name})
    }).catch(err => res.send("<script>alert('fish Data err')</script>"));
}

module.exports = {
    fish_collect
}