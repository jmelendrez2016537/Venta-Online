'use strict'

const Admin = require('../modelos/admin.modelo');
const bcrypt = require('bcrypt-nodejs')
const jwt = require('../servicios/jwt.admin');

function registroAdmin(req, res) {
    var adminModel = new Admin();
    var usuario = "ADMIN";
    var rol = "Admin"
    var contraseña = "123456";

    adminModel.usuario = usuario;
    adminModel.rol = rol;
    adminModel.contraseña = contraseña;
    Admin.find({
        $or: [
            { usuario: adminModel.usuario }
        ]
    }).exec((err, adminEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion del usuario' })
        if (adminEncontrado && adminEncontrado.length >= 1) {
            return console.log('El usuario ya existe')
        } else {
            bcrypt.hash(contraseña, null, null, (err, contraseñaEncriptada) => {
                adminModel.contraseña = contraseñaEncriptada;
                adminModel.save((err, adminGuardado) => {
                    if (err) return console.log('Error al guardar el usuario')
                    if (adminGuardado) {
                        console.log(adminGuardado)
                    } else {
                        console.log('No se ha podido registrar el usuario')
                    }
                })
            })
        }
    })
}

function loginAdmin(req, res) {
    var params = req.body;
    Admin.findOne({ usuario: params.usuario }, (err, adminEncontrado) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
        if (adminEncontrado) {
            bcrypt.compare(params.contraseña, adminEncontrado.contraseña, (err, passwordCorrecta) => {
                if (passwordCorrecta) {
                    if (params.obtenerToken === 'true') {
                        return res.status(200).send({
                            token: jwt.createToken(adminEncontrado)
                        })
                    } else {
                        adminEncontrado.contraseña = undefined;
                        return res.status(200).send({ adminEncontrado })
                    }
                } else {
                    return res.status(404).send({ mensaje: ' El usuario no se ha podido identificar' })
                }
            })
        } else {
            return res.status(404).send({ mensaje: 'El usuario no ha podido ingresar' })
        }
    })
}

module.exports = {
    registroAdmin,
    loginAdmin
}