const { Router } = require('express');

const multer = require('multer');
const path = require('path');

const { setNewRelation, checkFollow, deleteRelation, setNewVote, checkVote, deleteVote} = require('../controllers/relations.controller');
const router = Router();

/**AQUI SE CREA EL VOTO */

router.route('/createRelation')
    .post(setNewRelation)

router.route('/deleteRelation')
    .post(deleteRelation)

router.route('/checkFollow')
    .post(checkFollow)

router.route('/createVote')
    .post(setNewVote)

router.route('/deleteVote')
    .post(deleteVote)

router.route('/checkVote')
    .post(checkVote)

module.exports = router;