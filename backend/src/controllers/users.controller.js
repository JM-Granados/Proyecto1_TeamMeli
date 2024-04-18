const usersCtrl = {};

const UsersModel = require('../models/Users')

const bcrypt = require('bcrypt');
const saltRounds = 10;

usersCtrl.getUsers = async (req, res) => {
    await UsersModel.getAllUsers((err, users) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving users', error: err });
        } else {
            res.json(users);
        }
    });
}

usersCtrl.getPasswordByEmail = async (req, res) => {
    const email = req.params.email;
    await UsersModel.getPasswordByEmail(email, (err, password) => {
        if (err) {
            res.status(500).json({ error: err.message, detail: err.detail });
        } else {
            res.json({ message: 'User exist', password: password });
        }
    });
}

usersCtrl.getPasswordByUsername = async (req, res) => {
    const username = req.params.username;
    await UsersModel.getPasswordByUsername(username, (err, password) => {
        if (err) {
            res.status(500).json({ error: err.message, detail: err.detail });
        } else {
            res.json({ message: 'User exist', password: password });
        }
    });
}

usersCtrl.createUser = async (req, res) => {
    const { firstName, secondName, firstLastname, secondLastName, username, email, password, birthdate, avatar } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);


    req.body.password = hashedPassword;

    await UsersModel.createUser(req.body, (err, userId) => {
        if (err) {
            res.status(500).json({ error: err.message, detail: err.detail });
        } else {
            res.json({ message: 'User created', id: userId});
        }
    });
}

module.exports = usersCtrl;