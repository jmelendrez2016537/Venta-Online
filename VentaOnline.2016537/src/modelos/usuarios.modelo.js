'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var usuariosSchema = Schema({
    nombre: String,
    usuario: String,
    contraseña: String,
    rol: String
})

module.exports = mongoose.model('usuarios', usuariosSchema);