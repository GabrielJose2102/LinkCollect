//importando express, su metodo router
const express = require('express');
const router = express.Router();

//rederendizar modulo de agregar inicio de sesión
router.get('/', (req, res) =>{
    res.render('index.hbs');
});

//exportar el objeto router con todos sus metodos
module.exports = router;