'use strict'

const express = require("express");
const productoControlador = require("../controladores/producto.controlador");

var md_autenticacion = require('../middlewares/authenticated.admin')


var api = express.Router();

api.post('/registrarProducto', md_autenticacion.ensureAuth, productoControlador.registrarProducto);
api.get('/buscarProductos', md_autenticacion.ensureAuth, productoControlador.buscarProductos);
api.get('/buscarIdP/:idProducto', md_autenticacion.ensureAuth, productoControlador.buscarIdP);
api.put('/editarProducto/:idProducto', md_autenticacion.ensureAuth, productoControlador.editarProducto);
api.delete('/eliminarProducto/:idProducto', md_autenticacion.ensureAuth, productoControlador.eliminarProducto);


module.exports = api;