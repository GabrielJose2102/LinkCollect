const pool = require("./database");

const consulta = `

    SHOW TABLES;
`;

const consulta2 = `

    CREATE TABLE users (
        id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
         fullname VARCHAR(255) NOT NULL
    );

    CREATE TABLE links (
        id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
        titulo VARCHAR(150) NOT NULL,
        url VARCHAR(255) NOT NULL,
        description TEXT,
        user_id INT(11),
        create_at timestamp NOT NULL DEFAULT current_timestamp,
        CONSTRAINT fk_user FOREIGN KEY (user_id) 
         REFERENCES users (id) 
         ON DELETE CASCADE
    );

    CREATE TABLE sessions (
        session_id VARCHAR(128) NOT NULL PRIMARY KEY,
        expires INT(11) NOT NULL,
        data MEDIUMTEXT
    );
`;

pool.query(consulta, (error, result) =>{

    if(error) {
        console.log('Error al verificar tablas de la DB');
        return;
    } else {

        if (result[0] === undefined) {

            pool.query(consulta2, (error, result) =>{
                if (error) {
                    console.log('No se ah podido crear las tablas para esta base de datos');
                    return;
                }
                console.log('Creacion de Tablas exitosa');
                return;
            })

        } else {
            console.log('La DB contiene las Tablas establecidas');
        }
    }

});
