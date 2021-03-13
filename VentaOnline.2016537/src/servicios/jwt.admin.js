'use strict'
var jwt = require('jwt-simple')
var moment = require('moment')
var secret = 'claveAdmin'

exports.createToken = function(admin) {
    var payload = {
        sub: admin._id,
        usuario: admin.usuario,
        contraseña: admin.contraseña,
        rol: admin.rol,
        iat: moment().unix(),
        exp: moment().day(10, 'day').unix()
    }
    return jwt.encode(payload, secret);
}