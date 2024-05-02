// messages.controller.js
const connection = require('../database');
const Message = require('../models/Messages')

const ravenDB = connection.Raven;

// Conexión a RavenDB

const sendMessage = async (req, res) => {
    console.log("holaaa")
    const file = req.file ? req.file.filename : null;
    console.log(req.file)
    console.log(req.body)
    
    ravenDB.initialize();
    const session = ravenDB.openSession();
    // Asumiendo que req.body contiene los campos necesarios
    try {
        const message = new Message.Message(req.body.userSender, req.body.userRecipient, req.body.text, file);
    
        // Guardar el mensaje en RavenDB
        await session.store(message);
        await session.saveChanges();
        res.status(201).send(message);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error")
    }
};

const newNotification = async (req, res) => {
    console.log("holaaa")
    console.log(req.body)

    const text = `${req.body.userSender} just uploaded a new DataSet!`;

    console.log(text);
    
    ravenDB.initialize();
    const session = ravenDB.openSession();
    // Asumiendo que req.body contiene los campos necesarios
    try {
        const noti = new Message.Notification(req.body.userSender, text);
    
        // Guardar el mensaje en RavenDB
        await session.store(noti);
        await session.saveChanges();
        res.status(201).send(noti);
    } catch (err) {
        console.log(err);
        res.status(500).send("Error")
    }
};

const getMessages = async (req, res) => {
    const session = ravenDB.openSession();
    
    try {
        const {userSender, userRecipient} = req.params;

        const messages = await session.query({ collection: 'Messages' })
            .whereEquals('userSender', userSender)
            .andAlso()
            .whereEquals('userRecipient', userRecipient)
            .orElse()
            .whereEquals('userSender', userRecipient)
            .andAlso()
            .whereEquals('userRecipient', userSender)
            .orderBy('createdAt')
            .all();

        res.status(200).send(messages);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar los mensajes');
    }
};

const getNotification = async (req, res) => {
    console.log("hola");
    console.log(req.params);
    const session = ravenDB.openSession();
    
    try {
        const {userSender} = req.params;

        const notifications = await session.query({ collection: 'Notifications' })
            .whereEquals('user', userSender)
            .orderBy('createdAt')
            .all();

        res.status(200).send(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar los mensajes');
    }
};

const getChats = async (req, res) => {
    const session = ravenDB.openSession();

    try {
        const { userSender } = req.params;
        const people = new Set();

        
        const sentMessages = await session.query({ collection: 'Messages'})
            .whereEquals('userSender', userSender)
            .selectFields('userRecipient')
            .all();

        sentMessages.forEach(msg => {
            console.log(msg);
            if(msg !== userSender) {
                people.add(msg)
            }
        })


        const receiveMessages = await session.query({ collection: 'Messages'})
            .whereEquals('userRecipient', userSender)
            .selectFields('userSender')
            .all();

        receiveMessages.forEach(msg => {
            console.log(msg);
            if(msg !== userSender) {
                people.add(msg)
            }
        })

        const usernames = Array.from(people);
        console.log(usernames);

        const formattedUsernames = usernames.map(username => connection.dbMySQL.escape(username)).join(',');
        console.log(formattedUsernames);
        
        const sql = `SELECT * FROM users WHERE username IN (${formattedUsernames})`;
            
        connection.dbMySQL.query(sql, (sqlError, results) => {
            if (sqlError) {
                res.status(500).send('Error al recuperar los usuarios');
            } else if (results.length === 0) {
                res.status(500).send('Error al recuperar los usuarios');
            } else {
                console.log(results)
                res.status(200).send(results);
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('Error al recuperar los usuarios');
    }

};

module.exports = { 
    sendMessage,
    getMessages,
    getChats,
    newNotification,
    getNotification
};