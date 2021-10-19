const request = require("request");

function sendImg(parameters){ //비동기 처리
    return new Promise(function (resolve, reject){
        let options = {
            aiFlaskURL : "http://localhost:8080", //Default API 주소
            method : 'POST',
            body: {
                img : parameters.img
            }
        }

        request(options ,function (err, res, body){
            console.log(body); // 응답받은 base64 img 값 확인
            if(err){
                reject(new Error("Error"));
            }else{
                resolve(body);
            }
        })
    })
}

module.exports = {
    sendImg
}