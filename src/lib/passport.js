//importacion del modulo passport
const passport = require('passport');
//importando clase proporcionada por passport para la estrategia de autenticaion local
const LocalStrategy = require('passport-local').Strategy;
//
const {promisify} = require('util');

//importandi modulo de BD para usar los metodos del objeto pool
const pool = require('../database2');
const helpers = require('../lib/helpers');

const query = promisify(pool.query).bind(pool);

//configurando passport del signin proporcionando la estrategia a usar (local)
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    
    const rows = await query('SELECT * FROM users WHERE username = ?', [username]);
    console.log(req.body)
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if (validPassword) {
            req.flash('success', 'Bienvenido ' + user.username)
            done(null, user);
        } else {
            req.flash('message', 'Contraseña Incorrecta')
            done(null, false);
        }
    } else {
        req.flash('message', 'El nombre de usuario no existe')
        done(null, false);
    }

}));


//configurando passport del signup proporcionando la estrategia a usar (local)
passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
    //funcion callback para manejar la insersion a la BD (Aceptado o Fallo)
}, async (req, username, password, done) =>{
    //obteniendo datos de body (fullname)
    const {fullname} = req.body;
    //Objeto de datos a insertar en la BD
    const newUser = {
        username,
        password,
        fullname
    };
    //encryptacion del password antes de insertar en la BD
    newUser.password = await helpers.encryptPassword(password);
    //consulta sql para insertar los datos en la BD
    const result = await query('INSERT INTO users SET ?', [newUser]);
    //guardando el id dentro del objeto para retornarlo para ser guardado en la session
    //con ayuda de " serializeUser y deserializeUser ""
    newUser.id = result.insertId;
    return done(null, newUser);
}));

//serializamos los datos del usuario para mantenerlos en la sesion mientras este activa
passport.serializeUser((user, done) =>{
    done(null, user.id);
});

//deserializamos los datos del usuario para cuando necesitemos manipularlos en la aplicacion
passport.deserializeUser(async (id, done) =>{
    const rows = await query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});