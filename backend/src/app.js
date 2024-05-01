const express = require('express');
const cors = require('cors');

const app = express();

const path = require('path');
const multer  = require('multer');
const upload = multer();

//settings
app.set('port', 4000);

//middlewares

//app.use(upload.array()); 
app.use(cors());
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//routes
app.use('/api/users', require('./routes/users')) 

app.use('/api/datasets', require('./routes/datasets')) 

app.use('/api/relations', require('./routes/relations'))

app.use('/user-images', express.static(path.join(__dirname, 'UserImages')));
/**TAMBIEN HACER PARA VIDEOS Y ARCHIVOS */

module.exports = app;