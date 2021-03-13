'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var productoSchema = Schema({
    nombre: String,
    precio: String,
    stock: Number,
    ventas: Number,
    idCategoria: { type: Schema.ObjectId, ref: 'categoria' }
})

module.exports = mongoose.model('producto', productoSchema);