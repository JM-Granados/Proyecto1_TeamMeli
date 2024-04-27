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

const getIdByEmail = (email, callback) => {
    const sql = 'SELECT idUser FROM users WHERE email = ?';
    connection.dbMySQL.query(sql, [email], (err, results) => {
        if (err) {
            callback({message: 'User not found', code: 'USER_NOT_FOUND'}, null);
        } else {
            callback(null, results[0]);
        }
    });
}

const getUserByEmail = (email, callback) => {
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.dbMySQL.query(sql, [email], (err, results) => {
        if (err) {
            callback({message: 'User not found', code: 'USER_NOT_FOUND'}, null);
        } else {
            callback(null, results[0]);
        }
    });
}

const getUserByUsername = (username, callback) => {
    const sql = 'SELECT * FROM users WHERE username = ?';
    console.log(username);
    connection.dbMySQL.query(sql, [username], (err, results) => {
        if (err) {
            callback({message: 'User not found', code: 'USER_NOT_FOUND'}, null);
        } else if (results.length === 0) {
            callback({message: 'User not found', code: 'USER_NOT_FOUND'}, null);
        } else {
            callback(null, results[0]);
        }
    });
}

const getPasswordByEmail = (email) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT password FROM users WHERE email = ?`;
        connection.dbMySQL.query(sql, [email], (err, results) => {
            if (err || results.length === 0) {
                reject({ message: 'Email not found.', code: 'USER_NOT_FOUND' });
            } else {
                const password = results[0].password;
                const user = { password };
                resolve(user);
            }
        });
    });
};

const getPasswordByUsername = (username) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT password FROM users WHERE username = ?`;
        connection.dbMySQL.query(sql, [username], (err, results) => {
            if (err || results.length === 0) {
                reject({ message: 'Username not found.', code: 'USER_NOT_FOUND' });
            } else {
                const password = results[0].password;
                const user = { password };
                resolve(user);
            }
        });
    });
};

const createUser = (user, callback) => {    
    const sql = `
            INSERT INTO users (idUser, firstName, secondName, firstLastname, secondLastName, username, email, password, birthdate, avatar)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
    const neo = `
            CREATE (u: User {username: $username})
        `;
    
    connection.dbMySQL.query(sql, [
        null,
        user.firstName,
        user.secondName,
        user.firstLastName,
        user.secondLastName,
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
            const neo4j = connection.NeoDriver.session();
            neo4j
                .run(neo, { username: user.username })
                .then(result => {
                    neo4j.close();
                    callback(null, results.insertId); 
                })
                .catch(err => {
                    callback({ message: err.message }, null); 
                })
        }
    });
};

const updateUser = async (userToChange, updates, callback) => {
    const fieldsToUpdate = [...Object.entries(updates)
        .filter(([_, value]) => value !== undefined)
        .map(([key, value]) => `${key} = ?`)];
    
    // Si no hay campos para actualizar, termina la ejecución
    if (!fieldsToUpdate.length) {
        throw new Error('No update fields provided');
    }

    const values = [...Object.values(updates).filter(value => value !== undefined), userToChange];

    // Construye la parte SET de la consulta SQL
    const setClause = fieldsToUpdate.join(', ');
    
    // Construye y ejecuta la consulta SQL para actualizar
    const sql = `UPDATE users SET ${fieldsToUpdate} WHERE username = ?`;
    const neo = `
            MATCH (u:User {username: $userToChange})
            SET u.username = $newUsername
            RETURN u
        `;

    connection.dbMySQL.query(sql, values, (error, result) => {
        if (error) {
            callback({message: 'User not updated', code: 'USER_NOT_UPDATED'}, null);
        } else {
            if (updates.username) {
                const newUsername = updates.username;
                const neo4j = connection.NeoDriver.session();
                neo4j
                    .run(neo, { userToChange, newUsername })
                    .then(result => {
                        neo4j.close();
                        callback(null, result);
                    })
                    .catch(error => {
                        callback({message: 'User not updated', code: 'USER_NOT_UPDATED'}, null);
                    })
            } else {
                callback(null, result);
            }
        }
    })
}

const updatePassword = (user, callback) => {
    const sql = `UPDATE users SET password = ? WHERE email = ?`;
    connection.dbMySQL.query(sql, [user.password, user.email], (err, results) => {
        if (err) {
            callback({message: 'Password could not be saved', code: 'PASSWORD_ERROR'}, null);
        } else {
            callback(null, results); 
        }
    })
}

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
    getIdByEmail,
    getUserByEmail,
    getUserByUsername,
    getPasswordByEmail,
    getPasswordByUsername,
    createUser,
    updatePassword,
    updateUser
}