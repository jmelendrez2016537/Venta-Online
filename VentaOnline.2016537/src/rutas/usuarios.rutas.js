'use strict'

const express = require("express");
const usuariosControlador = require("../controladores/usuarios.controlador");

var md_autenticacion = require('../middlewares/authenticated.admin');
var md_autenticacion2 = require('../middlewares/authenticated.usuarios');

var api = express.Router();

api.post('/registrarUsuarios', md_autenticacion.ensureAuth, usuariosControlador.registroUsuarios);
api.post('/loginUsuarios', md_autenticacion.ensureAuth, usuariosControlador.loginUsuarios);
//api.put('/editarRolUsuarios', md_autenticacion.ensureAuth, usuariosControlador.editarRolUsuarios);
api.put('/editarUsuarios/:idUsuarios', md_autenticacion.ensureAuth, usuariosControlador.editarUsuarios);
api.delete('/eliminarUsuarios/:idUsuarios', md_autenticacion.ensureAuth, usuariosControlador.eliminarUsuarios);

api.post('/registroCliente', md_autenticacion2.ensureAuth, usuariosControlador.registroCliente);
api.get('/buscarNombreProducto/:nombreProducto', md_autenticacion2.ensureAuth, usuariosControlador.buscarNombreProducto);
api.get('/buscarCategoria/:idCategoria', md_autenticacion2.ensureAuth, usuariosControlador.buscarCategoria);
api.put('/editarCliente/:idUsuarios', md_autenticacion2.ensureAuth, usuariosControlador.editarCliente);
api.delete('/eliminarCliente/:idUsuario', md_autenticacion2.ensureAuth, usuariosControlador.eliminarCliente);

module.exports = api;