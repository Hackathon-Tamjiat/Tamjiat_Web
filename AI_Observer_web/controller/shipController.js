var express = require('express');
var shipDAO = require('../models/shipDAO')

function ship(req,res, next) {
    var ship_name = []
    var ship_number =[]
    var fish_type = []
    var fishing_type = []
    var tons = []
    shipDAO.ship_info().then((db_data) => {
        for(var i of db_data){
            ship_name.push(i['ship_name'])
            if(i['ship_number']==null) {
                ship_number.push("")
            }else{ship_number.push(i['ship_number'])}
            fish_type.push(i['ship_fish'])
            fishing_type.push(i['ship_fishing'])
            tons.push(i['ship_tons'])
        }
        res.render('ship', {ship_name,ship_number,fish_type,fishing_type,tons})
    }).catch(err => 
        {console.log(err)
        res.send("<script>alert('Ship Map Data err')</script>")});
}
function ship_detail(req,res, next) {
    var ship_name=[]
    var ship_tons=[]
    var ship_owner=[]
    var ship_location=[]
    var ship_dock=[]
    var ship_owner_phone=[]
    var ship_fish=[]
    var ship_fishing=[]
    var key = Object.keys(req.query)[0].split(":")[0]
    var value = Object.keys(req.query)[0].split(":")[1]

    Promise.all([shipDAO.tnc_data(key,value), shipDAO.ship_detail(key, value),shipDAO.ship_catch(key)]).then((value) => {
        var rpy_result = []
        var date = [31,28,31,30,31,30,31,31,30,31,30,31]
        for (var j = 0; j < 12; j++) {
            rpy_result.push([])
            for (var i =0;i<date[j];i++) {
                rpy_result[j].push([])
                for(var z=0;z<9;z++){
                    rpy_result[j][i].push([])
                }
            }
        }
        for (var m = 0; m < 12; m++) {
            for (var data of value[0]) {
                if (parseInt(data.MONTH) == m+1) {
                    for (var i = 0; i < date[m]; i++) {
                        if (parseInt(data.DAY) == i+1) {
                            rpy_result[m][i][0].push(data.roll)
                            rpy_result[m][i][1].push(data.pitch)
                            rpy_result[m][i][2].push(data.yaw)
                            rpy_result[m][i][3].push(data.DAY)
                            rpy_result[m][i][4].push(data.wath1)
                            rpy_result[m][i][5].push(data.wath2)
                            rpy_result[m][i][6].push(data.wath3)
                            rpy_result[m][i][7].push(data.battery)
                            rpy_result[m][i][8].push(data.spareB)
                            

                        }
                    }
                }
            }
            for(var n=0 ;n<rpy_result[m].length;n++){
                var roll = 0
                var pitch = 0
                var yaw = 0
                var day = 0
                var wath1 = 0
                var wath2 = 0
                var wath3 = 0
                var battery = 0
                var spareB = 0
                if(rpy_result[m][n][0].length==0){continue}
                roll = (rpy_result[m][n][0].reduce((a, b) => a + b) / rpy_result[m][n][0].length).toFixed(4)
                pitch = (rpy_result[m][n][1].reduce((a, b) => a + b) / rpy_result[m][n][1].length).toFixed(4)
                yaw = (rpy_result[m][n][2].reduce((a, b) => a + b) / rpy_result[m][n][2].length).toFixed(4)
                day = parseInt((rpy_result[m][n][3].reduce((a, b) => a + b) / rpy_result[m][n][3].length).toFixed(4))
                wath1 = (rpy_result[m][n][4].reduce((a, b) => a + b) / rpy_result[m][n][4].length).toFixed(4)
                wath2 = (rpy_result[m][n][5].reduce((a, b) => a + b) / rpy_result[m][n][5].length).toFixed(4)
                wath3 = (rpy_result[m][n][6].reduce((a, b) => a + b) / rpy_result[m][n][6].length).toFixed(4)
                battery = (rpy_result[m][n][7].reduce((a, b) => a + b) / rpy_result[m][n][7].length).toFixed(4)
                spareB = (rpy_result[m][n][8].reduce((a, b) => a + b) / rpy_result[m][n][8].length).toFixed(4)
                rpy_result[m][n]=[]
                rpy_result[m][n].push([roll,pitch,yaw,day,wath1,wath2,wath3,battery,spareB])
            }
        }
        for (var i of value[1]) {
            ship_name.push(i.ship_name)
            ship_tons.push(i.ship_tons)
            ship_owner.push(i.ship_owner)
            ship_location.push(i.ship_location)
            ship_dock.push(i.ship_dock)
            ship_owner_phone.push(i.ship_owner_phone)
            ship_fish.push(i.ship_fish)
            ship_fishing.push(i.ship_fishing)
        }

        console.log(value[2])

        res.render('ship_detail', { ship_name, ship_tons, ship_owner, ship_location, ship_dock, ship_owner_phone, ship_fish, ship_fishing,rpy_result })
    }).catch(err => {
        console.log(err)
        res.send("<script>alert('Ship Map Data err')</script>")
    });
}
function ship_detail_an(req,res, next) {res.render('ship_detail_an')}

module.exports = {
    ship,
    ship_detail,
    ship_detail_an
}