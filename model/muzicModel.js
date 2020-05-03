const fs = require('fs');

class Muzic {
    constructor() {
        const data = fs.readFileSync('./model/data.json');
        this.muzic = JSON.parse(data)
    }

    // Promise 예제
    getMuzicList() {
        if (this.muzic) {
            return this.muzic;
        }
        else {
            return [];
        }
    }

    addMuzic(title, singger, year) {
        return new Promise((resolve, reject) => {
            let last = this.muzic[this.muzic.length - 1];
            let id = last.id + 1;

            let newMuzic = {id, title, singger, year};
            this.muzic.push(newMuzic);

            resolve(newMuzic);
        });
    }

    updateMuzic(id, title, sinnger, year) {
        return new Promise((resolve, reject) => {
            console.log("에러");
            let updateMuzic = {id, title, sinnger, year};
            for (var muzic of this.muzic ) {
                if ( muzic.id == id ) {
                    this.muzic.splice(id, 1, updateMuzic); // 
                    resolve(updateMuzic);
                    console.log(updateMuzic);
                    return;
                }
            }
        });
    }

    deleteMuzic(id) {
        return new Promise((resolve, reject) => {
            this.muzic.splice(id,1);
            resolve(muzic);    
        });
    }

    // Promise - Reject
    getmuzicDetail(muzicId) {
        return new Promise((resolve, reject) => {
            for (let muzic of this.muzic ) {
                if ( muzic.id == muzicId ) {
                    resolve(muzic);
                    return;
                }
            }
            reject({msg:'Can not find muzic', code:404});
        });
    }
}

module.exports = new Muzic();