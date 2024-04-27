const { Router } = require('express');
const router = Router();

const { getDataSets, getDataSet, createDataSet } = require('../controllers/datasets.controller'); // Agrega getDataSet a la importación

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
    
router.route('/dataset_id/:id')
    .get(getDataSet)
    
module.exports = router;

