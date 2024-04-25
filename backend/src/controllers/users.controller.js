const usersCtrl = {};

const UsersModel = require('../models/Users')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const fs = require('fs');
const path = require('path');

var nodemailer = require('nodemailer');

usersCtrl.getUsers = async (req, res) => {
    await UsersModel.getAllUsers((err, users) => {
        if (err) {
            res.status(500).json({ message: 'Error retrieving users', error: err });
        } else {
            res.json({ message: 'Success', users: users });
        }
    });
}

usersCtrl.passwordRecovery = async (req, res) => {
    const email = req.params.email;
    await UsersModel.getIdByEmail(email, (err, id) =>{
        if (err) {
            res.status(500).json({error: err.message, detail: err.detail});
        } else {            
            var transporter = nodemailer.createTransport({
                service: "gmail",
                port: 465,
                secure: true,
                logger: true,
                debug: true,
                secureConnection: false,
                auth: {
                    user: 'poogr40@gmail.com',
                    pass: 'septtczjgleebadu'
                }, 
                tls: {
                    rejectUnauthorized: true
                }
            });
            
            var mailOptions = {
                from: 'poogr40@gmail.com',
                to: email,
                subject: 'Password recovery - Datahub',
                text: `Please, enter to the next link to reset you password: \n http://localhost:5173/ResetPassword`
            };

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    res.status(500).json({error: 'Email not sent', detail: 'EMAIL_NOT_SEND'});
                } else {
                    res.json({message: 'User exist', id: id})
                }
            });
        }
    });
}

usersCtrl.setNewPassword = async (req, res) => {
    const { email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    req.body.password = hashedPassword;

    await UsersModel.updatePassword(req.body, (err, id) =>{
        if (err) {
            res.status(500).json({error: err.message, detail: err.detail});
        } else {
            res.json({message: 'Password update', id: id})   
        }     
    });
}

usersCtrl.getUserByEmail = async (req, res) => {
    const email = req.params.email;
    await UsersModel.getUserByEmail(email, (err, user) =>{
        if (err) {
            res.status(500).json({error: err.message, detail: err.detail});
        } else {
            res.json({message: 'User exist', user: user})
        }
    });
}

usersCtrl.getUserByUsername = async (req, res) => {
    const username = req.params.username;
    await UsersModel.getUserByUsername(username, (err, user) =>{
        if (err) {
            res.status(500).json({error: err.message, detail: err.detail});
        } else {
            res.json({message: 'User exist', user: user})
        }
    });
}

usersCtrl.getPasswordByEmail = async (req, res) => {
    const { usernameEmail, password } = req.body;

    try {
        const user = await UsersModel.getPasswordByEmail(usernameEmail);
        
        if (user && user.password && password) {
            // Comparar la contraseña proporcionada con la almacenada (hash)
            const match = await bcrypt.compare(password, user.password);

            
            if (match) {

                res.json({ message: 'User exist and password is correct'});
            } else {
                res.status(401).json({ error: 'Username, email or password incorrect.', detail: 'PASSWORD_INCORRECT' });
            }
        } else {
            res.status(401).json({ error: 'Username, email or password incorrect.', detail: 'USER_NOT_FOUND' });
        }
    } catch (err) {
        // Maneja posibles errores que podrían ocurrir durante la verificación de la contraseña o la consulta
        res.status(500).json({ error: err.message, detail: err.detail });
    }
}


usersCtrl.getPasswordByUsername = async (req, res) => {
    const { usernameEmail, password } = req.body;

    try {
        const user = await UsersModel.getPasswordByUsername(usernameEmail);
        if (user && user.password && password) {
            // Comparar la contraseña proporcionada con la almacenada (hash)
            const match = await bcrypt.compare(password, user.password);

            
            if (match) {
                res.json({ message: 'User exist and password is correct'});
            } else {
                res.status(401).json({ error: 'Username, email or password incorrect.', detail: 'PASSWORD_INCORRECT' });
            }
        } else {
            res.status(401).json({ error: 'Username, email or password incorrect.', detail: 'USER_NOT_FOUND' });
        }
    } catch (err) {
        // Maneja posibles errores que podrían ocurrir durante la verificación de la contraseña o la consulta
        res.status(500).json({ error: err.message, detail: err.detail });
    }
};

usersCtrl.createUser = async (req, res) => {
    const { firstName, secondName, firstLastname, secondLastName, username, email, password, birthdate, avatar } = req.body;
    const avatarPath = req.file ? req.file.filename : null;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    req.body.password = hashedPassword;

    req.body.avatar = avatarPath;

    if (firstName === '' || firstLastname === '' || secondLastName === '' || username === '' || email === '' || password === '') {
        const imagePath = path.join(req.file.path);
        fs.unlink(imagePath, unlinkErr => {
            if (unlinkErr) {
                console.error('Error al eliminar el archivo de imagen:', unlinkErr);
            }
        });
        return res.status(500).json({ error: 'You missed a required field that cannot be null. All required fields have a "*". ', detail: 'NO_DATA' });
    } else {
        await UsersModel.createUser(req.body, (err, userId) => {
            if (err) {
                const imagePath = path.join(__dirname, '..', 'UserImages', req.body.avatar);
                fs.unlink(imagePath, unlinkErr => {
                    if (unlinkErr) {
                        console.error('Error al eliminar el archivo de imagen:', unlinkErr);
                    }
                });
                res.status(500).json({ error: err.message, detail: err.detail });
            } else {
                res.json({ message: 'User created', id: userId});
            }
        });
    }
    
}

usersCtrl.updateUser = async (req, res) => {
    const updates = req.body;
    const avatarPath = req.file ? req.file.filename : null;
    const userToChange = req.params.username



    if (updates.password) {
        const hashedPassword = await bcrypt.hash(updates.password, saltRounds);
        updates.password = hashedPassword;
    }

    
    if (avatarPath) {
        updates.avatar = avatarPath; 
    }

    await UsersModel.updateUser(userToChange, updates, (err, userId) => {
        if (err) {
            if (avatarPath) {
                const imagePath = path.join(__dirname, '..', 'UserImages', req.body.avatar);
                fs.unlink(imagePath, unlinkErr => {
                    if (unlinkErr) {
                        console.error('Error al eliminar el archivo de imagen:', unlinkErr);
                    }
                });
            }
            res.status(500).json({ error: err.message, detail: err.detail });
        } else {
            res.json({ message: 'User updated', user: updates});
        }
    });
} 

module.exports = usersCtrl;