'use strict';

var db = require("../config/h_db");

function land_select() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM Land;`, function (error, db_data) {
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
    land_select
}