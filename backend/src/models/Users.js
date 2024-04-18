const mysql = require('mysql2');
const connection = require('../database')

const getAllUsers = callback => {
    const sql = `SELECT * FROM users`;
    connection.dbMySQL.query(sql, (err, results) => {
        if (err) {
            callback(err, null);
        } else {
            callback(null, results);
        }
    });
};

const getPasswordByEmail = (email, callback) => {
    const sql = `SELECT password FROM users WHERE email = ?`;
    connection.dbMySQL.query(sql, [email], (err, results) => {
        if (err || results.length === 0) {
            callback({ message: 'User not found', code: 'USER_NOT_FOUND' }, null);
        } else {
            callback(null, results[0].password);
        }
    });
};

const getPasswordByUsername = (username, callback) => {
    const sql = `SELECT password FROM users WHERE username = ?`;
    connection.dbMySQL.query(sql, [username], (err, results) => {
        if (err || results.length === 0) {
            callback({ message: 'User not found', code: 'USER_NOT_FOUND' }, null);
        } else {
            callback(null, results[0].password);
        }
    });
};

const createUser = (user, callback) => {    
    const sql = `
        INSERT INTO users (idUser, firstName, secondName, firstLastname, secondLastName, username, email, password, birthdate, avatar)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    connection.dbMySQL.query(sql, [
        null,
        user.FirstName,
        user.SecondName,
        user.FirstLastName,
        user.SecondLastName,
        user.username,
        user.email,
        user.password,
        user.birthdate,
        user.avatar
    ], (err, results) => {
        if (err) {
            const errorInfo = decodeSQLMessage(err); 
            callback(errorInfo, null); 
        } else {
            callback(null, results.insertId); 
        }
    });
};

function decodeSQLMessage(err) {
    let message = 'An error occurred';
    switch (err.code) {
        case 'ER_DUP_ENTRY':
            message = 'A user with the given username or email already exists.';
            break;
        case 'ER_BAD_NULL_ERROR':
            message = 'You missed a required field that cannot be null. All required fields have a "*". ';
            break;
        default:
            message = err.sqlMessage || 'Unknown error occurred. Refresh and try again later.';
    }
    return { message, code: err.code, detail: err.sqlMessage };
}

module.exports = {
    getAllUsers,
    getPasswordByEmail,
    getPasswordByUsername,
    createUser
}