//exportando objeto con los datos de la BD 
/* const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } = require('./config');*/


const PORT = process.env.PORT || 3306; 


const MYSQLHOST = process.env.MYSQLHOST || 'localhost';

const MYSQLUSER = process.env.MYSQLUSER || 'root';

const MYSQLPASSWORD = process.env.MYSQLPASSWORD || '2102';

const MYSQLDATABASE = process.env.MYSQLDATABASE || 'database_links';

const MYSQLPORT = process.env.MYSQLPORT || 3306;

module.exports = {

    PORT,
    
    database: {
        host: MYSQLHOST,
        user: MYSQLUSER,
        password: MYSQLPASSWORD,
        database: MYSQLDATABASE,
        port: MYSQLPORT
    }
};