const express = require('express');
const router = express.Router();
const muzics = require('../model/muzicModel');
const model = require('../model/muzicModel');

router.get('/muzics', model.getMuzicList);
router.get('/muzicDetail', model.getmuzicDetail);
router.post('/muzics', model.addMuzic);
router.get('/muzicAdd', function(req, res, next) {
    res.render('../views/muzicAdd');
  });
router.get('/muzic', model.updateDetailMuzic);
router.post('/muzics/edit', model.updateMuzic);
router.get('/muzicDelete', model.deleteMuzic);

module.exports = router;