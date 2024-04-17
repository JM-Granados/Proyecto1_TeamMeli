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

const createUser = (user, callback) => {    
    const sql = `
        INSERT INTO users (idUser, firstName, secondName, firstLastname, secondLastName, username, email, password, birthdate, avatar)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    connection.dbMySQL.query(sql, [
        null,
        user.firstName,
        user.secondName,
        user.firstLastname,
        user.secondLastName,
        user.username,
        user.email,
        user.password,
        user.birthdate,
        user.avatar
    ], (err, results) => {
        if (err) throw err;
      callback(results.insertId); // Or handle the response in another way
    });
};

module.exports = {
    getAllUsers,
    createUser
}