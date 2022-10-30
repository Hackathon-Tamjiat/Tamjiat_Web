'use strict';

var db = require("../config/db");

function select_ship() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT mr_3000_list.my_id, mr_3000_list.name, mr_3000_list.fish_type, mr_3000_data.lat, mr_3000_data.lon, MAX(mr_3000_data.DATETIME) FROM mr_3000_data
        INNER JOIN mr_3000_list
        ON mr_3000_list.my_id = mr_3000_data.my_id
        GROUP BY mr_3000_list.my_id ORDER BY mr_3000_list.my_id;`, function (error, db_data) {
            if (error) {
                
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data)
            }
        });
    })
}

function ship_info() {
    return new Promise(function (resolve, reject) {
        h_db.query(`SELECT * FROM ship_info`, function (error, db_data) {
            if (error) {
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data)
            }
        });
    })
}

function fishyield() {
    return new Promise(function (resolve, reject) {
        h_db.query(`SELECT * FROM FishYield`, function (error, db_data) {
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
    select_ship,
    ship_info,
    fishyield
}