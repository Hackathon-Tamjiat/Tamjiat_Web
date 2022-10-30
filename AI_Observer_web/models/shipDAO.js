'use strict';
var h_db = require("../config/h_db");
var db = require("../config/db");

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

function ship_detail(key,value) {
    return new Promise(function (resolve, reject) {
        var sql = ""
        if(value==""){
            sql = "select * from ship_info where ship_name=\""+key+"\""
        }else{
            sql = "select * from ship_info where ship_name=\""+key+"\""+" and ship_number=\""+value+"\""
        }
        h_db.query(sql, function (error, db_data) {
            if (error) {
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data)
            }
        });
    })
}

function tnc_data(key, value) {
    return new Promise(function (resolve, reject) {
        var sql = "SELECT YEAR,MONTH, DAY, roll, pitch, yaw,wath1,wath2,wath3,battery,spareB FROM mr_3000_data WHERE my_id = (SELECT my_id FROM mr_3000_list where name LIKE \"%" + key + "%\" AND name LIKE \"%" + value + "%\") AND min<10"
        db.query(sql, function (error, db_data) {
            if (error) {
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data)
            }
        });
    })

}
function ship_catch(key) {
    return new Promise(function (resolve, reject) {
        var sql = ""
        sql = "SELECT * FROM FishYield WHERE BoatName=\""+key+"\""
        h_db.query(sql, function (error, db_data) {
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
    ship_detail,
    ship_info,
    tnc_data,
    ship_catch
}