//importando metodo del modulo timeago
const {format} = require('timeago.js');

//creando objeto helper donde se alojaran los metodos que saldran de este modulo
const helpers = {};

//funcion timeago para transformar el timestamp a un formato legible para la interface
helpers.timeago = (timestamp) => {
    return format(timestamp);
};

//exportar el objeto helpers con todos sus metodos
module.exports = helpers;