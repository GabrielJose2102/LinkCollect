-- Creacion de la BD 
CREATE DATABASE database_links;

-- Colocar en uso de la BD 
USE database_links;

-- Creacion de tabla de usuarios
CREATE TABLE users(
    id INT(11) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(16) NOT NULL,
    fullname VARCHAR(16) NOT NULL
);

-- Modificacion de Tabla
ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE users 
    MODIFY COLUMN fullname VARCHAR(255); 

ALTER TABLE users 
    MODIFY COLUMN username VARCHAR(255); 

--Mostrar caracteristicas de la tabla usuarios
DESCRIBE users;


--Crear tabla links
CREATE TABLE links (
    id INT(11) NOT NULL,
    titulo VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT(11),
    create_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
);

--Modificacion se añadio la calve primaria (id)
ALTER TABLE links
    ADD PRIMARY KEY (id);

--Modificacion se le añadio el auto incremento a la clave primaria (++2)
ALTER TABLE links
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

--Mostrar caracteristicas de la tabla links
DESCRIBE links;





--Crear tabla sessions
CREATE TABLE sessions (
    session_id VARCHAR(128) NOT NULL PRIMARY KEY,
    expires INT(11) NOT NULL,
    data MEDIUMTEXT
);


--Crear tabla tasks
CREATE TABLE tasks (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description MEDIUMTEXT,
    type INT(11) NOT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    states VARCHAR(100)
);


--Crear tabla tasks-users
CREATE TABLE tasks_users (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_user INT(11) NOT NULL,
    id_task INT(11) NOT NULL,
    CONSTRAINT fk_users FOREIGN KEY (id_user) 
        REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_task FOREIGN KEY (id_task) 
        REFERENCES tasks (id)
        ON DELETE CASCADE
);










/*Acomodar codigo de tablas para crear en railway*/

--Usuarios
CREATE TABLE users (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL
);


--Enlaces
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


--Guardar sesiones
CREATE TABLE sessions (
    session_id VARCHAR(128) NOT NULL PRIMARY KEY,
    expires INT(11) NOT NULL,
    data MEDIUMTEXT
);


--Tareas
CREATE TABLE tasks (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    description MEDIUMTEXT,
    type INT(11) NOT NULL,
    create_at TIMESTAMP NOT NULL DEFAULT current_timestamp,
    states VARCHAR(100)
);


--Tareas-Usuarios
CREATE TABLE tasks_users (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_user INT(11) NOT NULL,
    id_task INT(11) NOT NULL,
    CONSTRAINT fk_users FOREIGN KEY (id_user) 
        REFERENCES users (id)
        ON DELETE CASCADE,
    CONSTRAINT fk_task FOREIGN KEY (id_task) 
        REFERENCES tasks (id)
        ON DELETE CASCADE
);



--Imagenes
CREATE TABLE images (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255) NOT NULL,
    url MEDIUMTEXT,
    tasks INT(11) NOT NULL,
    CONSTRAINT fk_taskimg FOREIGN KEY (tasks) 
        REFERENCES tasks (id)
        ON DELETE CASCADE
);