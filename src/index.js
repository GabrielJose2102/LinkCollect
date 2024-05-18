const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MYSQLStore = require('express-mysql-session')(session);
const passport = require('passport');
const {pool} = require('./database2');


const {database} = require('./keys');

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