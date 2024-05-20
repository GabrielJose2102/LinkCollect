const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const pool = require('./database');


const {database} = require('./keys');


//construccion de la base de datos

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
`;

pool.query(consulta, (error, result) =>{

    if(error) {
        console.log('Error al verificar tablas de la DB');
        return;
    } else {
              console.log(result[0].Tables_in_railway)
        if (result[0] === undefined || result[0].Tables_in_railway === 'sessions') {

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

 // Inicializations
const app = express();
require('./lib/passport');


 // Settings
app.set('port', process.env.PORT || 2000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
}));
app.set('views engine', '.hbs');


 // Middlewares
app.use(session({
    secret: 'faztmysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MYSQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



 // Global Variables
app.use((req, res, next) =>{
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
});


 // Routes
app.use(require('./routes'));
app.use(require('./routes/authentications'));
app.use('/links', require('./routes/links'));



 // Public
//
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src/public/css', (req, res, next) => {
    res.setHeader('Content-Type', 'text/css');
    next();
  }, express.static(__dirname + '/public/css'));

 // Starting the server
app.listen(app.get('port'), ()=>{
    console.log('Server on Port: ', app.get('port'));
});