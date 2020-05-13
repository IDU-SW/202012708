const Sequelize = require('sequelize');

const sequelize = new Sequelize('musics', 'root', 'cometrue', {
    dialect: 'mysql',
    host: '127.0.0.1'
 });


 class Music extends Sequelize.Model {}
Music.init({
 id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
 title: {
    type: Sequelize.STRING,
    allowNull: true
 },
 singer: {
    type: Sequelize.STRING,
    allowNull: true
 },
 year: {
    type: Sequelize.INTEGER,
    allowNull: true,
    validate: { min: 1, max: 12 }
 }
}, {sequelize});

Music.sync().then( ret => {
    console.log('Sync Success :', ret);
    sequelize.close();
 }).catch(error => {
    console.error('Sync Failure :', error);
 });