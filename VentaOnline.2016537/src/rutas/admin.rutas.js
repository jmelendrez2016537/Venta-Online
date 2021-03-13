'use strict'

const express = require("express");
const adminControlador = require("../controladores/admin.controlador");

var api = express.Router();

api.post('/login', adminControlador.loginAdmin);


module.exports = api;