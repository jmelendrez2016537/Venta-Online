'use strict'

const mongoose = require('mongoose')
var Schema = mongoose.Schema;
var adminSchema = mongoose.Schema;

var adminSchema = Schema({
    usuario: String,
    rol: String,
    contraseña: String
})

module.exports = mongoose.model('admin', adminSchema);