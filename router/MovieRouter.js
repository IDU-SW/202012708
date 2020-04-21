const express = require('express');
const router = express.Router();
const muzics = require('../model/muzicModel');

router.get('/muzics', showMuzicList);
router.get('/muzics/:muzicId', showMuzicDetail);
router.post('/muzics', addMuzic);

module.exports = router;

function showMuzicList(req, res) {
    const muzicList = muzics.getMuzicList();
    const result = { data:muzicList, count:muzicList.length };
    res.send(result);
}


// Async-await를 이용하기
async function showMuzicDetail(req, res) {
    try {
        // 영화 상세 정보 Id
        const muzicId = req.params.muzicId;
        console.log('muzicId : ', muzicId);
        const info = await muzics.getmuzicDetail(muzicId);
        res.send(info);
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
        res.send({msg:'success', data:result});
    }
    catch ( error ) {
        res.status(500).send(error.msg);
    }
}