const { Router } = require('express');
const multer = require('multer');
const path = require('path');

var nodemailer = require('nodemailer');

const { getUsers, createUser, getPasswordByEmail, getPasswordByUsername, getUserByEmail, getUserByUsername, passwordRecovery, setNewPassword, updateUser } = require('../controllers/users.controller');
const router = Router();

const storageData = multer.memoryStorage();

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

const uploadData = multer({ storage: storageData });

router.route('/')
    .get(getUsers)
    .post(upload.single('avatar'), createUser);
    
router.route('/email/:email')
    .post(getPasswordByEmail)
    .get(getUserByEmail);

router.route('/username/:username')
    .post(getPasswordByUsername)
    .get(getUserByUsername);

router.route('/forgot-password/:email')
    .post(passwordRecovery);

router.route('/recovery-password/:email')
    .put(setNewPassword)

router.route('/update/:username')
    .post(uploadData.single('data'), updateUser)

router.route('/updateWithAvatar/:username')
    .post(upload.single('avatar'), updateUser)

module.exports = router;
