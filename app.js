const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');
// 템플릿 파일 위치 설정(필수)
app.set('views', __dirname + '/views');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({ extended: false }));

const movieRouter = require('./router/MovieRouter');
app.use(movieRouter);

module.exports = app;

