/////////////////////////////////////////////

//MySql
// const mysql = require('mysql2');
// const URI_mysql = process.env.MYSQL_URI;


// const dbMySQL = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '0990',
//     database: URI_mysql
// });

// dbMySQL.connect( (error) =>{
//     if(error) {
//         console.log(error);
//     }else {
//         console.log("MYSQL is connected :D...");
//     }
// })

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
// const neo4j = require('neo4j-driver');

const driver = neo4j.driver('bolt://localhost', neo4j.auth.basic('neo4j', '123456789'));
const session = driver.session();

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
const { DocumentStore } = require('ravendb');

// const store = new DocumentStore('https://a.projectteammeli.ravendb.community/', 'databaseName');
// store.initialize();

/*async function checkConnection() {
    try {
        // Abre una sesión para interactuar con la base de datos
        const session = store.openSession();
        
        // Realiza una consulta sencilla, por ejemplo, obtener todos los documentos de un tipo específico
        const results = await session.query({ collection: 'YourCollectionName' }).all(); // Asegúrate de reemplazar 'YourCollectionName' con el nombre de tu colección
        console.log('RavenDB is connected :D...');
        console.log(results); // Muestra los resultados de la consulta
    } catch (error) {
        console.error('Error conectando a RavenDB:', error);
    } finally {
        // Cierra el DocumentStore cuando termines
        store.dispose();
    }
}

checkConnection();*/

/////////////////////////////////////////////



module.exports = {
    dbMySQL,
    NeoDriver
}
