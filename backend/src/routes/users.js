const { Router } = require('express');
const { getUsers, createUser } = require('../controllers/users.controller');
const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser);

module.exports = router;