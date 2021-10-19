'use strict';
var db = require("../config/db");
var logger = require('../config/logger');

function select_crop(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT cid, cropsName, cropsCultivar,cropsStart, cropsEnd, cropsMemo FROM userCrop WHERE uid = '${parameters.uid}' ORDER BY cid DESC;`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]" +
                    "\n \t" + `SELECT cid, c.cropsName, cropsCultivar, cropsStart, cropsEnd, cropsMemo
                               FROM userCrop
                               WHERE  uid = '${parameters.uid}'  ORDER BY cropsEnd DESC;;` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_cropDetail(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM userCrop WHERE cid = '${parameters.cid}' and uid = '${parameters.uid}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]" +
                    "\n \t" + `SELECT * FROM userCrop WHERE cid = '${parameters.cid}' and uid = '${parameters.uid}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_cropCode() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT *
                  FROM cropCode`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [cropCode]" +
                    "\n \t" + `SELECT *
                               FROM cropCode` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_cropCategory() {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT *
                  FROM cropCategory`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [cropCategory]" +
                    "\n \t" + `SELECT *
                               FROM cropCategory` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}


function insert_crop(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`INSERT INTO userCrop SET uid = '${parameters.uid}' , cropsName = '${parameters.cropsName}', categoryName = '${parameters.categoryName}', cropsCultivar = '${parameters.cropsCultivar}',
         locate = '${parameters.locate}', useCompost = '${parameters.useCompost}', cropsStart='${parameters.cropsStart}', cropsEnd = '${parameters.cropsEnd}', goalYield = '${parameters.goalYield}',
         currentYield = '${parameters.currentYield}', cropsMemo = '${parameters.cropsMemo}',latitude='${parameters.send_lat}', longitude='${parameters.send_lng}' , cropsFinish = 'false'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]" +
                    "\n \t" + `INSERT INTO userCrop SET uid = '${parameters.uid}' , cropsName = '${parameters.cropsName}', categoryName = '${parameters.categoryName}', cropsCultivar = '${parameters.cropCultivar}',
                    locate = '${parameters.locate}', useCompost = '${parameters.useCompost}', cropsStart='${parameters.cropsStart}', cropsEnd = '${parameters.cropsEnd}', goalYield = '${parameters.goalYield}',
                    currentYield = '${parameters.currentYield}', cropsMemo = '${parameters.cropsMemo}',cropsFinish = 'false' ` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_cropPercent(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT cid, cropsName, cropsCultivar, 
        ROUND(((TIMESTAMPDIFF(DAY, cropsStart, NOW()))/(TIMESTAMPDIFF(DAY, cropsStart, cropsEnd))) * 100) AS percent 
        ,cropsStart, cropsEnd FROM userCrop WHERE uid = '${parameters.uid}';`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]" +
                    "\n \t" + `SELECT cid, cropsName, cropsCultivar, 
                    ROUND(((TIMESTAMPDIFF(DAY, cropsStart, NOW()))/(TIMESTAMPDIFF(DAY, cropsStart, cropsEnd))) * 100) AS percent 
                    ,cropsStart, cropsEnd FROM userCrop WHERE uid = '${parameters.uid}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_dcrop(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT *
                  FROM userDcrop where uid = '${parameters.uid}' ORDER BY did DESC`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDcrop]" +
                    "\n \t" + `SELECT *
                               FROM userDcrop
                               ORDER BY cropsDate DESC` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_dcropDetail(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT ud.did, ud.cropsName, ud.cropsCultivar, ud.AICheck, ud.cdName, ud.cropsImage, cd.cdSolution, ud.cropsDate, ud.cropsMemo, cd.cdNameEng, cd.cdOccurDate, cd.cdSickness, cd.cdPathogen FROM userDcrop 
        as ud JOIN diseaseCode as cd ON cd.cdName = ud.cdName WHERE ud.uid = '${parameters.uid}' and ud.did = '${parameters.did}';`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDcrop]" +
                    "\n \t" + `SELECT ud.did, ud.cropsName, ud.cropsCultivar, ud.AICheck, ud.cdName, cd.cdSolution, ud.cropsDate, ud.cropsMemo, cd.cdNameEng, cd.cdOccurDate, cd.cdSickness, cd.cdPathogenFROM userDcrop
                     as ud JOIN diseaseCode as cd ON cd.cdName = ud.cdName WHERE ud.uid = '${parameters.uid}';` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function insert_dcrop(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`INSERT INTO userDcrop SET uid = '${parameters.uid}' , cropsName = '${parameters.cropsName}', cropsCultivar = '${parameters.cropsCultivar}',
          cropsImage = '${parameters.cropsImage}', cropsDate=NOW(), cropsMemo = '${parameters.cropsMemo}', cduuid = '${parameters.cduuid}', AICheck = '${parameters.AICheck}', cdName = '${parameters.cdName}', iscdCheck = 'false'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDcrop]" +
                    "\n \t" + `INSERT INTO userDcrop SET uid = '${parameters.uid}' , cropsName = '${parameters.cropsName}', cropsCultivar = '${parameters.cropsCultivar}',
                    cropsImage = '${parameters.cropsImage}', cropsDate=NOW(), cropsMemo = '${parameters.cropsMemo}' , cduuid = '${parameters.cduuid}', AICheck = '${parameters.AICheck}', cdName = '${parameters.cdName}', iscdCheck = 'false'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_cropDisease(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM userDcrop WHERE iscdCheck = 'true' and uid = '${parameters.uid}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDCrop]" +
                    "\n \t" + `SELECT * FROM userDcrop WHERE iscdCheck = 'true' and uid = '${parameters.uid}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_notice(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT *
                  FROM notice ORDER BY nDate DESC`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [notice]" +
                    "\n \t" + `SELECT *
                               FROM notice ORDER BY nDate DESC` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_noticeDetail(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT * FROM notice WHERE nid = '${parameters.nid}'; `, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [notice]" +
                    "\n \t" + `SELECT * FROM notice WHERE nid = '${parameters.nid}';` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function insert_notice(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`INSERT INTO notice SET nTitle = '${parameters.nTitle}',nContent = '${parameters.nContent}',nWriter = '${parameters.nWriter}',nDate = NOW()`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [notice]" +
                    "\n \t" + `SELECT *
                               FROM notice` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_totalGrowPercent(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT ROUND(((TIMESTAMPDIFF(day, cropsStart, NOW())) / (TIMESTAMPDIFF(day, cropsStart, cropsEnd))) * 100, 2) AS percent  FROM userCrop WHERE uid = '${parameters.userid}' and cropsName = '${parameters.cropsName}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [totalGrowPercent]" +
                    "\n \t" + `SELECT ROUND(((TIMESTAMPDIFF(day, cropsStart, NOW())) / (TIMESTAMPDIFF(day, cropsStart, cropsEnd))) * 100, 2) AS percent  FROM userCrop WHERE uid = '${parameters.userid}' and cropsName = '${parameters.cropsName}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    });
}

function select_nearHarvestDate(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT cropsEnd FROM userCrop WHERE NOW() <= cropsEnd AND uid = "${parameters.userid}" and cropsName = "${parameters.cropsName}" ORDER BY cropsEnd ASC LIMIT 1`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [nearHarvestDate]" +
                    "\n \t" + `SELECT cropsEnd FROM userCrop WHERE NOW() <= cropsEnd AND uid = "${parameters.userid}" and cropsName = "${parameters.cropsName}" ORDER BY cropsEnd ASC LIMIT 1` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        })
    })
}

function select_totalYieldPercent(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT uid, ((sum(currentYield) / sum(goalYield)) * 100) AS avgYield FROM userCrop WHERE uid='${parameters.userid}' and cropsName ='${parameters.cropsName}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [totalYieldPercent]" +
                    "\n \t" + `SELECT uid, ((sum(currentYield) / sum(goalYield)) * 100) AS avgYield FROM userCrop WHERE uid='${parameters.userid}' and cropsName = '${parameters.cropsName}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    });
}

function select_countDisease_totalCrops(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT ifnull(CAST(COUNT(*) AS CHAR), '-') AS result FROM userDcrop WHERE uid = "${parameters.userid}" and cropsName = "${parameters.cropsName}" AND CURDATE() = cropsDate AND iscdCheck="true" GROUP BY cropsCultivar WITH rollup`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDcrop]" +
                    "\n \t" + `SELECT ifnull(CAST(COUNT(*) AS CHAR), '-') AS result FROM userDcrop WHERE uid = "${parameters.userid}" and cropsName = "${parameters.cropsName}" AND CURDATE() = cropsDate GROUP BY cropsCultivar WITH rollup` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    });
}

function select_dashMenuList(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT DISTINCT cropsName FROM userCrop WHERE uid = '${parameters.uid}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]" +
                    "\n \t" + `SELECT DISTINCT cropsName FROM userCrop WHERE uid = '${parameters.uid}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
  }

function select_userLatLon(parameterLocate) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT latitude, longitude FROM userCrop where locate = '${parameterLocate.locate}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]" +
                    "\n \t" + `SELECT latitude, longitude FROM userCrop where locate = '${parameterLocate.locate}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_dashcropFinish(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT cropsName, cropsEnd
                  FROM userCrop
                  WHERE cropsFinish = 'true' and uid = '${parameters.uid}'
                  ORDER BY cropsEnd DESC LIMIT 4;`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]" +
                    "\n \t" +`SELECT cropsName, cropsEnd
                    FROM userCrop
                    WHERE cropsFinish = 'true' and uid = '${parameters.uid}'
                    ORDER BY cropsEnd DESC LIMIT 4;` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}
function update_dashcropFinish(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`UPDATE userCrop SET cropsFinish = 'true' WHERE uid = '${parameters.uid}' and cid ='${parameters.cid}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]" +
                    "\n \t" +`UPDATE userCrop SET cropsFinish = 'true' WHERE uid = '${parameters.uid}' and cid ='${parameters.cid}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_userLocateCrop(parameters){
    return new Promise(function (resolve, reject) {
        db.query(`SELECT locate, cropsName, cropsCultivar, latitude, longitude FROM userCrop WHERE uid = '${parameters.uid}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]" +
                    "\n \t" + `SELECT locate, cropsName, cropsCultivar, latitude, longitude FROM userCrop WHERE uid = '${parameters.uid}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_userLocate(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT locate FROM userCrop where uid = '${parameters.userid}' and cropsName = '${parameters.cropsName}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]" +
                    "\n \t" + `SELECT locate FROM userCrop where uid = '${parameters.userid}' and cropsName= '${parameters.cropsName}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_dashcropDisease(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT cdName, cropsDate
                  FROM userDcrop
                  WHERE iscdCheck = 'true' and uid = '${parameters.uid}'
                  ORDER BY cropsDate DESC LIMIT 7;`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDcrop]" +
                    "\n \t" + `SELECT cdName, cropsDate
                    FROM userDcrop
                    WHERE iscdCheck = 'true' and uid = '${parameters.uid}'
                    ORDER BY cropsDate DESC LIMIT 7;` +
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
    
    function select_countDisease_date(parameters) {
        return new Promise(function (resolve, reject) {
            db.query(`SELECT cropsDate, COUNT(cropsDate) AS count FROM userDcrop WHERE uid = '${parameters.userid}' AND cropsName = '${parameters.cropsName}' GROUP BY cropsDate`, function (error, db_data) {
                if (error) {
                    logger.error(
                        "DB error [userDcrop]"+
                        "\n \t" + `SELECT cropsDate, COUNT(cropsDate) AS count  FROM userDcrop WHERE uid = "1234" AND cropsName = "고추"  GROUP BY cropsDate` +
                        "\n \t" + error);
                    reject('DB ERR');
                    //throw error;
                } else {
                    resolve(db_data);
                }
            });
        })
    }
  function select_dashDonut(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT if(cropsName IS NULL, "total", cropsName) AS crops, COUNT(cropsName) AS count  FROM userCrop WHERE uid = '${parameters.uid}' GROUP BY cropsName`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `SELECT if(cropsName IS NULL, "total", cropsName) AS crops, COUNT(cropsName) AS count  FROM userCrop WHERE uid = '${parameters.uid}' GROUP BY cropsName` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}
function select_dashBar(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT *	FROM ( SELECT DATE_FORMAT(aa.temp_date, '%Y-%m') date, COUNT(c.cropsDate) as cnt FROM 
        temp_date aa LEFT JOIN userDcrop c on (c.cropsDate = aa.temp_date AND c.uid = '${parameters.uid}') GROUP BY date) a
      WHERE date LIKE CONCAT('%',DATE_FORMAT(NOW(),'%Y'),'%')`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDcrop]"+
                    "\n \t" + `SELECT *	FROM ( SELECT DATE_FORMAT(aa.temp_date, '%Y-%m') date, COUNT(c.cropsDate) as cnt FROM 
                    temp_date aa LEFT JOIN userDcrop c on (c.cropsDate = aa.temp_date AND c.uid = '${parameters.uid}') GROUP BY date) a
                  WHERE date LIKE CONCAT('%',DATE_FORMAT(NOW(),'%Y'),'%')` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_dashCurve(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT *	FROM (SELECT DATE_FORMAT(aa.temp_date, '%Y-%m') date, COUNT(c.cropsStart) as cnt FROM 
        temp_date aa LEFT JOIN userCrop c on (c.cropsStart = aa.temp_date AND c.uid = '${parameters.uid}') GROUP BY date) a
      WHERE date LIKE CONCAT('%',DATE_FORMAT(NOW(),'%Y'),'%')`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `SELECT *	FROM (SELECT DATE_FORMAT(aa.temp_date, '%Y-%m') date, COUNT(c.cropsStart) as cnt FROM 
                    temp_date aa LEFT JOIN userCrop c on (c.cropsStart = aa.temp_date AND c.uid = '${parameters.uid}') GROUP BY date) a
                  WHERE date LIKE CONCAT('%',DATE_FORMAT(NOW(),'%Y'),'%')` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}
function delete_crop(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`Delete from userCrop where cid = '${parameters.cid}' and uid = '${parameters.uid}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `Delete from userCrop where cid = '${parameters.cid}' and uid = '${parameters.uid}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}
function delete_dcrop(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`Delete from userDcrop where did = '${parameters.did}' and uid = '${parameters.uid}' `, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `Delete from userDcrop where did = '${parameters.did}' and uid = '${parameters.uid}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}
function delete_notice(parameters) {
    return new Promise(function (resolve, reject) {
        db.query(`Delete from notice where nid = '${parameters.nid}'`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userCrop]"+
                    "\n \t" + `Delete from notice where nid = '${parameters.nid}'` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}

function select_appData(parameter) {
    return new Promise(function (resolve, reject) {
        db.query(`SELECT ud.cdName, ud.cropsImage, cd.cdSolution, cd.cdNameEng, cd.cdOccurDate, cd.cdSickness, cd.cdPathogen FROM userDcrop 
        as ud JOIN diseaseCode as cd ON cd.cdName = ud.cdName WHERE ud.uid = '${parameter.uid}' and ud.cduuid = '${parameter.cduuid}' AND ud.cdName="${parameter.result}";`, function (error, db_data) {
            if (error) {
                logger.error(
                    "DB error [userDCrop]"+
                    "\n \t" + `SELECT ud.cdName, ud.cropsImage, cd.cdSolution, cd.cdNameEng, cd.cdOccurDate, cd.cdSickness, cd.cdPathogen FROM userDcrop 
                    as ud JOIN diseaseCode as cd ON cd.cdName = ud.cdName WHERE ud.uid = '1883125542' and ud.cduuid = '${parameters.cduuid}';` +
                    "\n \t" + error);
                reject('DB ERR');
                //throw error;
            } else {
                resolve(db_data);
            }
        });
    })
}
module.exports = {
    select_crop,
    select_cropDetail,
    select_cropCode,
    select_cropDisease,
    insert_crop,
    insert_dcrop,
    delete_crop,
    delete_dcrop,
    delete_notice,
    select_cropCategory,
    select_cropPercent,
    select_dcrop,
    select_dcropDetail,
    select_notice,
    insert_notice,
    select_noticeDetail,
    select_totalGrowPercent,
    select_nearHarvestDate,
    select_totalYieldPercent,
    select_countDisease_totalCrops,
    select_dashMenuList,
    select_userLocate,
    select_userLatLon,
    select_dashcropFinish,
    update_dashcropFinish,
    select_dashcropDisease,
    select_countDisease_date,
    select_dashDonut,
    select_dashBar,
    select_dashCurve,
    select_userLocateCrop,
    select_appData
}