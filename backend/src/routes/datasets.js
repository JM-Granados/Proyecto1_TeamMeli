const { Router } = require('express');
const router = Router();

const { getDataSets, createDataSet } = require('../controllers/datasets.controller');

router.route('/')
    .get(getDataSets)
    .post(createDataSet);
    
module.exports = router;

