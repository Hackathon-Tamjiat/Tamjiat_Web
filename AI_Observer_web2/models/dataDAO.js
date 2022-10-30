'use strict';

var db = require("../config/h_db");

function data_info() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM ship_data_collect;`, function (error, db_data) {
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
    data_info
}