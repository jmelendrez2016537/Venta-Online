'use strict'
var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'claveUsuario'

exports.createToken = function(usuarios) {
    var payload = {
        sub: usuarios._id,
        nombre: usuarios.nombre,
        usuario: usuarios.usuario,
        contraseña: usuarios.contraseña,
        rol: usuarios.rol,
        iat: moment().unix(),
        exp: moment().day(10, 'day').unix()
    }
    return jwt.encode(payload, secret);
}