const express = require('express');
const router = express.Router();
const muzics = require('../model/muzicModel');
const model = require('../model/muzicModel');
const session = require('express-session');

router.use(session({
  resave:true,
  saveUninitialized:false,
  secret:'Secret Key'})
);

router.get('/muzics', model.getMuzicList);
router.get('/muzicDetail', model.getmuzicDetail);
router.post('/muzics', model.addMuzic);
router.get('/muzicAdd', function(req, res, next) {
    res.render('../views/muzicAdd');
  });
router.get('/muzic', model.updateDetailMuzic);
router.post('/muzics/edit', model.updateMuzic);
router.get('/muzicDelete', model.deleteMuzic);
router.post('/login', handleLogin);
router.delete('/logout',handleLogout);
const user = {
  id : '202012708',
  password : '1234',
  name : 'yhg',
}

function handleLogin(req, res) {
  const id = req.body.id;
  const password = req.body.password;

  if ( id === user.id && password === user.password ) {
     // 로그인 성공시 : 세션에 사용자 ID 저장
     req.session.userid = id;
     res.sendStatus(200);
  }
  else {
     res.sendStatus(401);
  }
}

function handleLogout(req, res) {
  req.session.destroy( err => {
     if ( err ) {
        res.sendStatus(500);
     }
     else {
        // 로그아웃 성공
        res.sendStatus(200);
     }
  });
}

module.exports = router;