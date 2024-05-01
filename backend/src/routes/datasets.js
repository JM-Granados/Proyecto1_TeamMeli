const { Router } = require('express');
const router = Router();

const { getDataSets, getDataSet, createDataSet, getDataSetsbyUser, addCommentToDataSet, uploadDataset_photo, uploadDataset_archives, uploadDataset_tutorial } = require('../controllers/datasets.controller'); // Agrega getDataSet a la importación

const multer = require('multer');
const path = require('path');

// const storage1 = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join(__dirname, '..', 'DatasetImages'));
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now());
//     }
// });

// const upload1 = multer({ storage: storage1 });

// const storage2 = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join(__dirname, '..', 'DatasetArchives'));
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now());
//     }
// });

// const upload2 = multer({ storage: storage2 });
// //const upload2 = multer({ storage: storage2 }).array('dataset_archive');

// const storage3 = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, path.join(__dirname, '..', 'DatasetTutorial'));
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now());
//     }
// });

// const upload3 = multer({ storage: storage3 });

const express = require('express');
const cors = require('cors');



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

// app.post('/api/datasets', upload.any(), (req, res) => {
//     console.log(req.files); // Deberías ver los archivos adjuntos aquí
//     // Resto de tu lógica para crear el DataSet...
//   });

const uploadFields = upload.fields([
    { name: 'dataset_photo' },
    { name: 'dataset_archive' },
    { name: 'dataset_tutorial' }
]);



router.route('/')
    .get(getDataSets)
    .post(uploadFields, createDataSet); // Aquí utilizamos multer

// router.route('/uploadphoto' )
//     .post(upload1.single('dataset_photo'), uploadDataset_photo);

// router.route('/uploadarchives')
//     .post(upload2.array('da'), uploadDataset_archives);
// // router.route('/uploadarchives')
// //     .post(upload2, uploadDataset_archives);

// router.route('/uploadtutorial' )
//     .post(upload3.single("dataset_tutorial"), uploadDataset_tutorial);

router.route('/dataset_id/:id')
    .get(getDataSet)

router.route('/dataset_user/:username')
    .get(getDataSetsbyUser)

router.route('/dataset_comment')
    .post(addCommentToDataSet);

module.exports = router;

