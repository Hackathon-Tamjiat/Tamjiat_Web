var express = require('express');
var dataDAO = require('../models/dataDAO')

function data_collect(req,res, next) {
    var no=[]
    var ship_name=[]
    var ship_fish=[]
    var ship_location=[]
    var install_date=[]
    var collect_num=[]
    var collect_last=[]
    var duration=[]
    
    dataDAO.data_info().then((db_data)=>{
        for(var i of db_data){
            no.push(i.no);
            ship_name.push(i.ship_name);
            ship_fish.push(i.ship_fish);
            ship_location.push(i.ship_location);
            install_date.push(i.install_date);
            collect_num.push(i.collect_num);
            collect_last.push(i.collect_last);
            duration.push(i.duration);
            
        }
        res.render('data_collect',{no,ship_name,ship_fish,ship_location,install_date,collect_num,collect_last,duration})
    }).catch(err => res.send("<script>alert('Ship equipment Data err')</script>"));
}

module.exports = {
    data_collect
}