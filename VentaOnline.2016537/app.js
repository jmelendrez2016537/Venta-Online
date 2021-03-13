'use strict'
const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const registrarAdmin = require("./src/controladores/admin.controlador")
const adminRuta = require("./src/rutas/admin.rutas")
const productoRuta = require("./src/rutas/producto.rutas")
const categoriaRuta = require("./src/rutas/categoria.rutas")
const usuariosRuta = require("./src/rutas/usuarios.rutas")

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
    //app.use(cors())

registrarAdmin.registroAdmin();
app.use('/api', adminRuta)
app.use('/api', productoRuta)
app.use('/api', categoriaRuta)
app.use('/api', usuariosRuta)

module.exports = app;