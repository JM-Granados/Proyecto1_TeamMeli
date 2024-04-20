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
        console.log(error)
    }else {
        console.log("MYSQL Connected...")
    }
})

module.exports = {
    dbMySQL
}

/////////////////////////////////////////////
// MongoDB
/*
const mongoose = require('mongoose');

const mongoose = require('mongoose');

//console.log(process.env.MONGODB_URI);

const URI = process.env.MONGODB_URI;
mongoose.connect(URI);



const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('MongoDB is connected :D...')
});


mongoConnection.once('open', () =>{
    console.log('MongoDB connected...');
});
*/

/////////////////////////////////////////////
//Neo4j

/////////////////////////////////////////////
//Redis

/////////////////////////////////////////////


/*
module.exports = {
    dbMySQL
}
*/