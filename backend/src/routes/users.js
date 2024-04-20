const { Router } = require('express');
const multer = require('multer');
const path = require('path');

const { getUsers, createUser, getPasswordByEmail, getPasswordByUsername, getUserByEmail, getUserByUsername } = require('../controllers/users.controller');
const router = Router();


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'UserImages')); // La carpeta UserImages debe estar en el root de tu proyecto de backend
    },
    filename: function (req, file, cb) {
      // Guardar el archivo con un nombre único para evitar sobreescrituras.
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

router.route('/')
    .get(getUsers)
    .post(upload.single('avatar'), createUser);

router.route('/email/:email')
    .post(getPasswordByEmail)
    .get(getUserByEmail)

router.route('/username/:username')
    .post(getPasswordByUsername)
    .get(getUserByUsername)

module.exports = router;
