'use strict';

var db = require("../config/h_db");

function equipment_info() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT i.no,i.ship_name,i.ship_location,i.ship_dock,i.ship_fish,i.ship_fishing,e.cctv,e.cctv_date,e.blackbox,e.blackbox_date,e.router,e.router_date FROM ship_info i, ship_equipment e WHERE i.no = e.no;`, function (error, db_data) {
            if (error) {
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data)
            }
        });
    })
}

module.exports = {
    equipment_info
}