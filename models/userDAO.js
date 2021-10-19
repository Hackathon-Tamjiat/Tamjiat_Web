'use strict';
var db = require("../config/db");
var logger = require('../config/logger');

function insert_userInfo(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`INSERT INTO userInfo VALUES ('${parameters.id}', '${parameters.name}', '${parameters.email}', '${parameters.img}', '${parameters.token}')`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userInfo]"+
                    "\n \t" + `INSERT INTO userInfo VALUES ('${parameters.id}', '${parameters.name}', '${parameters.email}', '${parameters.img}', '${parameters.token}')` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            else{
                resolve(db_data);
            }
        });
    })
}

function select_userFind(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`select uid, userName FROM userInfo WHERE uid='${parameters.id}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userInfo]"+
                    "\n \t" + `select uid, userName FROM userInfo WHERE uid='${parameters.id}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            else{
                resolve(db_data);
            }
        });
    })
}

function update_userInfo(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`update userInfo set uid = '${parameters.id}', userName = '${parameters.name}', userEmail = '${parameters.email}', userImage = '${parameters.img}', userToken='${parameters.token}' where uid = '${parameters.id}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userInfo]"+
                    "\n \t" + `update userInfo set uid = '${parameters.id}', userName = '${parameters.name}', userEmail = '${parameters.email}', userImage = '${parameters.img}', userToken='${parameters.token}' where uid = '${parameters.id}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            }
            else{
                resolve(db_data);
            }
        });
    })
}

module.exports = {
    insert_userInfo,
    select_userFind,
    update_userInfo
}