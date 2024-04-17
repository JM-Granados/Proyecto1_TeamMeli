const usersCtrl = {};

const UsersModel = require('../models/Users')

usersCtrl.getUsers = async (req, res) => {
    await UsersModel.getAllUsers((err, users) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving users', error: err });
        } else {
            res.json(users);
        }
    });
}

usersCtrl.createUser = async (req, res) => {
    const { firstName, secondName, firstLastname, secondLastName, username, email, password, birthdate, avatar } = req.body;
    await UsersModel.createUser(req.body, userId => {
        res.json({ message: 'User created', id: userId});
    });
}

module.exports = usersCtrl;