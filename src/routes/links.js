//importando express, su metodo router
const express = require('express');
const router = express.Router();
const {promisify} = require('util');

//importando el archivo de la bd 
const pool = require('../database2');
const {isLoggedIn} = require('../lib/auth');

const query = promisify(pool.query).bind(pool);

//rederendizar modulo de agregar links
router.get('/add', isLoggedIn, (req, res) =>{
    res.render('links/add.hbs');
});


//insertar informacion a la BD desde modulo agragar links
router.post('/add', async (req, res) =>{
    //obteniendo datos desde el body(edit.hbs)
    const {title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description,
        user_id: req.user.id
    };
    //consulta para insertar datos en la tabla links
    await query('INSERT INTO links SET ?', [newLink]);
    req.flash('success', 'Enlace guardado exitosamente');
    //Redireccionar a modulo de links
    res.redirect('/links');
});


//mostrar lista de links agregados en la BD
router.get('/', isLoggedIn, async (req, res) =>{
    const links = await query('SELECT * FROM links WHERE user_id = ?', [req.user.id]);
    res.render('links/list.hbs', {links});
});


//funcion del boton delete, eliminar links de la BD
router.get('/delete/:id', isLoggedIn, async (req, res) =>{
    const {id} = req.params;
    await query('DELETE FROM links WHERE id = ?', [id]);
    req.flash('success', 'Enlaces eliminados con éxito');
    res.redirect('/links')
});


//seleccionar y extraer id desde la BD del elemento a modificar
router.get('/edit/:id', isLoggedIn, async (req, res) =>{
    const {id} = req.params;
    const links = await query('SELECT * FROM links WHERE id=?', [id]);
    res.render('links/edit.hbs', {link: links[0]});
});


//funcion del boton edit, editar links de la BD
router.post('/edit/:id', async (req, res) =>{
    //obteniendo id para especificar el conjunto de datos a modificar
    const {id} = req.params;
    //obteniendo datos desde el body(edit.hbs)
    const {title, url, description} = req.body;
    const newLink = {
        title,
        url,
        description
    };
    //consulta para actualizar datos en la tabla links
    await query('UPDATE links set ? WHERE id=?', [newLink, id]);
    req.flash('success', 'Enlace actualizado exitosamente');
    res.redirect('/links');
});


//exportar el objeto router con todos sus metodos
module.exports = router;