var express = require('express');
var equipmentDAO = require('../models/equipmentDAO')

function date_null(params) {
    if (params=="0000-00-00"){
        return ""
    }else{
        return params
    }
}

function equipment(req,res, next) {
    var no=[];
    var ship_name=[];
    var ship_location=[];
    var ship_dock=[];
    var ship_fish=[];
    var ship_fishing=[];
    var cctv=[];
    var cctv_date=[];
    var blackbox=[];
    var blackbox_date=[];
    var router=[];
    var router_date=[];

    equipmentDAO.equipment_info().then((db_data)=>{
        for(var i of db_data){
            no.push(i.no);
            ship_name.push(i.ship_name);
            ship_location.push(i.ship_location);
            ship_dock.push(i.ship_dock);
            ship_fish.push(i.ship_fish);
            ship_fishing.push(i.ship_fishing);
            cctv.push(i.cctv);
            cctv_date.push(date_null(i.cctv_date));
            blackbox.push(i.blackbox);
            blackbox_date.push(date_null(i.blackbox_date));
            router.push(i.router);
            router_date.push(date_null(i.router_date));
        }
        res.render('equipment',{no,ship_name,ship_location,ship_dock,ship_fish,ship_fishing,cctv,cctv_date,blackbox,blackbox_date,router,router_date})
    }).catch(err => res.send("<script>alert('Ship equipment Data err')</script>"));
}

module.exports = {
    equipment
}