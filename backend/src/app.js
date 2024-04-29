const express = require('express');
const cors = require('cors');

const app = express();

const path = require('path');

//settings
app.set('port', 4000);

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use('/api/users', require('./routes/users')) 

app.use('/api/datasets', require('./routes/datasets')) 

app.use('/api/relations', require('./routes/relations'))

app.use('/user-images', express.static(path.join(__dirname, 'UserImages')));

app.use('/api/messages', require('./routes/messages'))


module.exports = app;