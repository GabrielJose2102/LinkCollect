//importando modulo de encryptacion
const bcrytp = require('bcryptjs');

//creanndo objeto que alojara los metodos
const helpers = {};

//metodo de encryptado de password
helpers.encryptPassword = async (password) =>{
    const salt = await bcrytp.genSalt(10);
    const hash = await bcrytp.hash(password, salt);
    return hash;
};


//metodo de comparacion contraseña guardada con la proporcionada por el usuario
helpers.matchPassword = async (password, savePassword) =>{
    try {
        return await bcrytp.compare(password, savePassword);
    } catch (e) {
        console.log(e);
    }
};


//exportacion de objeto con los metodos del modulo
module.exports = helpers;