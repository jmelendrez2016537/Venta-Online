'use strict'

const express = require("express");
const categoriaControlador = require("../controladores/categoria.controlador");

var md_autenticacion = require('../middlewares/authenticated.admin')

var api = express.Router();

api.post('/registrarCategoria', md_autenticacion.ensureAuth, categoriaControlador.registrarCategoria);
api.get('/buscarCategorias', md_autenticacion.ensureAuth, categoriaControlador.buscarCategorias);
api.put('/editarCategoria/:idCategoria', md_autenticacion.ensureAuth, categoriaControlador.editarCategoria);
api.delete('/eliminarCategoria/:idCategoria', md_autenticacion.ensureAuth, categoriaControlador.eliminarCategoria);

module.exports = api;