const express = require('express');
const router = express.Router();
const muzics = require('../model/muzicModel');

router.get('/muzics', showMuzicList);
router.get('/muzics/:muzicId', showMuzicDetail);
router.post('/muzics', addMuzic);
router.get('/muzicAdd', function(req, res, next) {
    res.render('../views/muzicAdd');
  });
router.get('/muzic/:muzicId', showMuzicDetail1);
router.post('/muzics/edit', updateMuzic);
router.delete('/muzics/:muzicId', deleteMuzic);

module.exports = router;

function showMuzicList(req, res) {
    const muzicList = muzics.getMuzicList();
    const result = { data:muzicList, count:muzicList.length };

    res.render('../views/muzicList',{data:muzicList});
}


// Async-await를 이용하기
async function showMuzicDetail(req, res) {
    try {
        // 영화 상세 정보 Id
        const muzicId = req.params.muzicId;
        console.log('muzicId : ', muzicId);
        const info = await muzics.getmuzicDetail(muzicId);
        console.log(info);
        res.render('../views/muzicDetail',{info:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

async function showMuzicDetail1(req, res) {
    try {
        // 영화 상세 정보 Id
        const muzicId = req.params.muzicId;
        console.log('muzicId : ', muzicId);
        const info = await muzics.getmuzicDetail(muzicId);
        console.log(info);
        res.render('../views/updateMuzic',{info:info});
    }
    catch ( error ) {
        console.log('Can not find, 404');
        res.status(error.code).send({msg:error.msg});
    }
}

async function addMuzic(req, res) {
    const title = req.body.title;

    if (!title) {
        res.status(400).send({error:'title 누락'});
        return;
    }

    const sinnger = req.body.sinnger;
    const year = parseInt(req.body.year);

    try {
        const result = await muzics.addMuzic(title, sinnger, year);
        const muzicList = muzics.getMuzicList();
        res.render('../views/muzicList',{data:muzicList});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function updateMuzic(req, res) {
    const id = req.body.id;
    const title = req.body.title;
    const sinnger = req.body.sinnger;
    const year = parseInt(req.body.year);
    console.log(id, title, sinnger, year);
    try {
        const result = await muzics.updateMuzic(id, title, sinnger, year);
        console.log(result);
        res.render('../views/updateComplete',{data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}

async function deleteMuzic(req, res) {
    const id = req.params.muzicId;
    try {
        const result = await muzics.deleteMuzic(id);
        res.send({msg:'success', data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}