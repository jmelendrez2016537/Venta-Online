'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var categoriaShema = Schema({
    nombre: String,
    descripcion: String,

})

module.exports = mongoose.model('categoria', categoriaShema);