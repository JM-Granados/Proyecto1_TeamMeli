const { Router } = require('express');

const multer = require('multer');
const path = require('path');

const { setNewRelation, checkFollow } = require('../controllers/relations.controller');
const router = Router();

router.route('/createRelation')
    .post(setNewRelation)

router.route('/checkFollow')
    .post(checkFollow)

module.exports = router;