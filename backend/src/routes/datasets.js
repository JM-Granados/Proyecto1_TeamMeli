const { Router } = require('express');
const router = Router();

const { getDataSets, getDataSet, createDataSet, getDataSetsbyUser,addCommentToDataSet, uploadDataset_photo, uploadDataset_archives, uploadDataset_tutorial } = require('../controllers/datasets.controller'); // Agrega getDataSet a la importación

const multer = require('multer');
const path = require('path');

const storage1 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', 'DatasetImages'));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload1 = multer({ storage: storage1 });

const storage2 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', 'DatasetArchives'));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

//const upload2 = multer({ storage: storage2 });
const upload2 = multer({ storage: storage2 }).array('uploadDataset_archives');

const storage3 = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '..', 'DatasetTutorial'));
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
});

const upload3 = multer({ storage: storage3 });


router.route('/')
    .get(getDataSets)
    .post(createDataSet);

router.route('/uploadphoto' )
    .post(upload1.single('dataset_photo'), uploadDataset_photo);
    
/*router.route('/uploadarchives')
    .post(upload2.single('da'), uploadDataset_archives);*/
router.route('/uploadarchives')
    .post(upload2, uploadDataset_archives);

router.route('/uploadtutorial' )
    .post(upload3.single("dataset_tutorial"), uploadDataset_tutorial);

router.route('/dataset_id/:id')
    .get(getDataSet)

router.route('/dataset_user/:username')
    .get(getDataSetsbyUser)

router.route('/dataset_comment') 
    .post(addCommentToDataSet); 
    
module.exports = router;

