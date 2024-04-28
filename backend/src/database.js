/////////////////////////////////////////////

//MySql
const mysql = require('mysql2');
const URI_mysql = process.env.MYSQL_URI;


const dbMySQL = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0990',
    database: URI_mysql
});

dbMySQL.connect( (error) =>{
    if(error) {
        console.log(error);
    }else {
        console.log("MYSQL is connected :D...");
    }
})

/////////////////////////////////////////////
// MongoDB

const mongoose = require('mongoose');

const URI = process.env.MONGODB_URI;
mongoose.connect(URI);


const connection = mongoose.connection;

mongoose.connect(URI, {
    //useNewUrlParser: true,
    //useCreateIndex: true
});

connection.once('open', () =>{
    console.log('MongoDB is connected :D...');
});

/////////////////////////////////////////////
//Neo4j
const neo4j = require('neo4j-driver');

const NeoDriver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '123456789'));
const session = NeoDriver.session();

function checkConnection() {
    session
        .run('MATCH (n) RETURN n LIMIT 1') // Ejecuta una consulta sencilla
        .then(result => {
            console.log('Neo4j is connected :D...'); 
            session.close(); 
        })
        .catch(error => {
            console.error('Error conectando a Neo4j:', error); // Mensaje de error
        });
}

checkConnection();

/////////////////////////////////////////////
//Raven
const { DocumentStore, GetStatisticsOperation } = require('ravendb');

// Configura la tienda de documentos (DocumentStore) que es el punto de entrada principal para interactuar con RavenDB

const store = new DocumentStore('http://127.0.0.1:8080', 'Messages');
store.initialize();

// Ahora puedes usar la tienda de documentos para acceder a tu base de datos y realizar operaciones
async function testConnection() {
    try {
        // Usa `maintenance` para enviar una operación y obtener las estadísticas de la base de datos
        const statistics = await store.maintenance.send(new GetStatisticsOperation());
        return true;
    } catch (error) {
        console.error('Connection test failed:', error);
        return false;
    }
}

testConnection().then(isConnected => {
    if (isConnected) {
        console.log('RavenDB is conected :D...');
    } else {
        console.log('No se pudo establecer conexión con la base de datos.');
    }
});


/////////////////////////////////////////////



module.exports = {
    dbMySQL,
    NeoDriver
}
