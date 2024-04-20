
const { Router } = require('express');
const { getUsers, createUser, getPasswordByEmail, getPasswordByUsername, getUserByEmail, getUserByUsername } = require('../controllers/users.controller');
const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser);

router.route('/email/:email')
    .post(getPasswordByEmail)
    .get(getUserByEmail)

router.route('/username/:username')
    .post(getPasswordByUsername)
    .get(getUserByUsername)

module.exports = router;
