const mysql = require('mysql2');
const {database} = require('./keys');

const pool = mysql.createConnection(database);

pool.connect((error) =>{
    if (error) {
        console.log('Error al conectar a la BD');
        return;
    }
    console.log('Conexion BD exitosa');
});


module.exports = pool;