//importando express, su metodo router
const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
const {promisify} = require('util');

//importando modulo passport
const passport = require('passport');
const pool = require('../database');

const query = promisify(pool.query).bind(pool);

const {isLoggedIn, isNotloggedIn} = require('../lib/auth');


            //SignUp

//redenrendizar la interface de signup
router.get('/signup', isNotloggedIn, (req, res) =>{
    res.render('auth/signup.hbs');
});

//autenticar el usuario con passport

//usar la funcion authenticate para manejar la autenticacion de una solicitud
    /*/se le proporciona como parametro, como la estrategia de autenticaion,
       que hara cuando procese la autenticacion y que hara si falla esa autenticacion 
       esta ultima como un objeto */
router.post('/signup', passport.authenticate('local.signup', {
        //OK
        successRedirect: '/profile',
        //Error
        failureRedirect: '/signup',
        failureFlash: true
}));


            //SignIn

//redenrendizar la interface de signin
router.get('/signin', isNotloggedIn, (req, res) =>{
    res.render('auth/signin.hbs');
});


//usar la funcion authenticate para manejar la autenticacion de una solicitud
    /*/se le proporciona como parametro, como la estrategia de autenticaion,
       que hara cuando procese la autenticacion y que hara si falla esa autenticacion 
       esta ultima como un objeto */

router.post('/signin', (req, res, next) =>{
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res)
});



//Creando ruta donde accedera si la autenticacion es correcta
router.get('/profile', isLoggedIn, (req, res) =>{
    res.render('profile.hbs');
});

// Revisar
router.get('/user/delete', isLoggedIn, async (req, res) =>{
    const id = req.user.id;
    console.log(id);
    try {
        await query('DELETE FROM users WHERE id = ?', [id]);
        req.flash('success', 'Usuario eliminados con éxito');
        req.logOut(()=>{});
        res.redirect('/signin');
    } catch (e) {
        console.log(e)
    }
});


//Creando ruta para Logout
router.get('/logout', isLoggedIn, (req, res) =>{
    req.logOut(()=>{});
    res.redirect('/signin');
});


//exportar el objeto router con todos sus metodos
module.exports = router;