'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;

var facturaSchema = Schema({
    idUsuario: { type: Schema.ObjectId, ref: 'usuario' },
    idProducto: { type: Schema.ObjectId, ref: 'producto' },
    compra: Number,
    total: Number,
})

module.exports = mongoose.model('factura', facturaSchema);