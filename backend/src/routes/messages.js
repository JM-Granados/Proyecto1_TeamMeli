const { Router } = require('express');
const multer = require('multer');
const path = require('path');

const { sendMessage, getMessages, getChats, newNotification, getNotification } = require('../controllers/messages.controller');
const router = Router();

const storageData = multer.memoryStorage();

/**GUARDA EN LA CARPETA DEL PROYECTO */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', 'sendFiles')); // La carpeta UserImages debe estar en el root de tu proyecto de backend
    },
    /**AQUI METE A LA IMAGEN CON UN NOMBRE ORIGINAL */
    filename: function (req, file, cb) {
      // Guardar el archivo con un nombre único para evitar sobreescrituras.
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

const uploadData = multer({ storage: storageData });

router.route('/sendMessage')
    .post(upload.single('file'), sendMessage) 

router.route('/newNotification')
    .post(newNotification)

router.route('/getMessages/:userSender/:userRecipient')
    .get(getMessages)

router.route('/usuarios/:userSender')
    .get(getChats)

router.route('/getNotifications/:userSender')
    .get(getNotification)

module.exports = router;