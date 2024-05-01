const { Router } = require('express');
const router = Router();
const multer = require('multer');
const path = require('path');
const express = require('express');
const cors = require('cors');

const { getDataSets, getDataSet, createDataSet, getDataSetsbyUser, addCommentToDataSet, cloneDataSet } = require('../controllers/datasets.controller'); // Agrega getDataSet a la importación

// Configurar multer para manejar los archivos adjuntos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', 'DatasetArchives'));
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});
const upload = multer({ storage: storage });
const uploadFields = upload.fields([
    { name: 'dataset_photo' },
    { name: 'dataset_archive' },
    { name: 'dataset_tutorial' }
]);


router.route('/')
    .get(getDataSets)
    .post(uploadFields, createDataSet); // Aquí utilizamos multer

router.route('/dataset_cloned/')
    .post(cloneDataSet)

router.route('/dataset_id/:id')
    .get(getDataSet)

router.route('/dataset_user/:username')
    .get(getDataSetsbyUser)

router.route('/dataset_comment')
    .post(addCommentToDataSet);

module.exports = router;

