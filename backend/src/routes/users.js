const { Router } = require('express');
const { getUsers, createUser, getPasswordByEmail, getPasswordByUsername } = require('../controllers/users.controller');
const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/email/:email')
    .get(getPasswordByEmail)

router.route('/username/:username')
    .get(getPasswordByUsername)

module.exports = router;