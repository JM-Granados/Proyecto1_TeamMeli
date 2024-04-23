const { Router } = require('express');
const router = Router();

const { getDataSets, createDataSet } = require('../controllers/datasets.controller');

const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', 'uploadsFiles'));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload = multer({ storage: storage });


router.route('/')
    .get(getDataSets)
    .post(upload.any(), createDataSet);
    
module.exports = router;

