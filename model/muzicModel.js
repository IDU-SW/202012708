const fs = require('fs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('muzics', 'dev', 'cometrue', {
    dialect: 'mysql', host :'127.0.0.1'
})

class Music extends Sequelize.Model {}
Music.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: Sequelize.STRING,
    sinnger: Sequelize.STRING,
    year: Sequelize.STRING
}, {tableName: 'music', sequelize})

class Music {
    constructor() {
        try{
            this.prepareTable();
        } catch (err){
            console.error(err);
        }
    }

    async prepareTable() {
        try {
            await MusicList.sync({force:true});
        }catch (err){
            console.log('musicList 준비 실패 :', err);
        }
    }

    async musicdata(music){
        try{
            const mret = await MusicList.create({
                title: music.title,
                sinnger: music.sinnger,
                year: music.year,
            }, {logging: false});

            const newData = mret.dataValues;

            await mret.setMusicInfo(iret);

            console.log(newData);
            console.log('Create success');
        } catch (err) {
            console.log('ERROR : ', err);
        }
    }

    async getMusicList() {
        let rtn;
        await MusicList.findAll({include:[{model:Music}]})
        .then( results => {
            for (var item of results) {
                console.log('id:', item.id, ', title:', item.title, ', sinnger:', item.sinnger, ', year:', item.year);
            }
            rtn = results;
        })
        .catch( error => {
            console.error('Error :', error);
        });
        return rtn;
    }

    // 상세보기
    async getMusicDetail(id) {
        try {
            let results = await MusicList.findAll({where: {id:id}, include:[{model:Music}]});
            for (var item of results) {
                console.log('id : ', item.id, ' title : ', item.title);
            }
            if ( results ) {
                return results[0];
            }
            else {
                console.log('no data');
            }
        }
        catch (error) {
            console.log('Error : ', error);
        }
    }

    // 추가
    async addMusic(title, sinnger, year) {
        let newMusic = {title, sinnger, year};
        console.log(newMusic);
        try {
            const newData = await this.musicdata(newMusic);
            console.log(newData);
            console.log('Create success');
            return newMusic;
        }
        catch (error) {
            console.log('Error : ', error);
        }
    }

    // 삭제
    async delMusic(id) {
        try {
            let results = await MusicList.findAll({where: {id:id}, include:[{model:Music}]});

            let result = await MusicList.destroy({where:{id:id}, include:[{model:Music}]});
            
            for (var item of results) {
                console.log('Remove item id : ', item.id, ', title : ', item.title);
            }
            if ( results ) {
                console.log('Remove success :', result);
                return results[0];
            }
            else {
                console.log('no data');
            }
        }
        catch (error) {
            console.log('Remove Error :', error);
        }
    }
    
    // 수정
    async editMusic(id, title, sinnger, year) {
        try {
            let music = await MusicList.findByPk(id);
            music.title = title;
            music.sinnger = sinnger;
            music.year = year;
            let ret = await music.save();

            let changedMusic = ret.dataValues;

            let results = await MusicList.findAll({where: {id:id}, include:[{model:Music}]});
            return results[0];
        }
        catch (error) {
            console.log('Error :', error);
        }
    }
}

module.exports = new Music();