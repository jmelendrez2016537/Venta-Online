'use strict'

const Usuarios = require('../modelos/usuarios.modelo');
const Producto = require('../modelos/producto.model');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../servicios/jwt.usuarios');


function registroUsuarios(req, res) {
    var usuariosModel = new Usuarios();
    var params = req.body;
    if (req.admin.rol === "Admin") {
        if (params.nombre && params.usuario && params.contraseña && params.rol) {
            usuariosModel.nombre = params.nombre;
            usuariosModel.usuario = params.usuario;
            usuariosModel.contraseña = params.contraseña;
            usuariosModel.rol = params.rol;
            Usuarios.find({
                $or: [
                    { nombre: usuariosModel.nombre },
                    { usuario: usuariosModel.usuario }
                ]
            }).exec((err, usuariosEncontrados) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Usuario' })
                if (usuariosEncontrados && usuariosEncontrados.length >= 1) {
                    return console.log('El usuario ya existe')
                } else {
                    bcrypt.hash(params.contraseña, null, null, (err, contraseñaEncriptada) => {
                        usuariosModel.contraseña = contraseñaEncriptada;
                        usuariosModel.save((err, usuarioGuardado) => {
                            if (err) return console.log('Error al guardar el usuario')
                            if (usuarioGuardado) {
                                return res.status(200).send({ usuarioGuardado })
                            } else {
                                console.log('No se ha podido registrar el usuario')
                            }
                        })
                    })
                }
            })
        }
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function loginUsuarios(req, res) {
    var params = req.body;
    if (req.admin.rol === "Admin") {
        Usuarios.findOne({ usuario: params.usuario }, (err, usuarioEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
            if (usuarioEncontrado) {
                bcrypt.compare(params.contraseña, usuarioEncontrado.contraseña, (err, contraseñaCorrecta) => {
                    if (contraseñaCorrecta) {
                        if (params.obtenerToken === 'true') {
                            return res.status(200).send({
                                token: jwt.createToken(usuarioEncontrado)
                            })
                        } else {
                            usuarioEncontrado.contraseña = undefined;
                            return res.status(200).send({ usuarioEncontrado })
                        }
                    } else {
                        return res.status(404).send({ mensaje: 'El usuario no se ha podido identificar' })
                    }
                })
            } else {
                return res.status(404).send({ mensaje: 'El usuario no a podido iniciar secion' })
            }
        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

/*function editarRolUsuarios(req, res) {
    var idUsuarios = req.params.idUsuarios;
    var params = req.body
    delete params.contraseña;
    if (req.admin.rol === "Admin") {
        if (params.rol) {
            Usuarios.findByIdAndUpdate(idUsuarios, params, { new: true }, (err, UsuarioActualizado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!UsuarioActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el usuario' });
                return res.status(200).send({ UsuarioActualizado });
            })
        }
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}*/

function editarUsuarios(req, res) {
    var idUsuarios = req.params.idUsuarios;
    var usuarioRol = "Admin";
    var params = req.body
    delete params.contraseña;
    if (req.admin.rol === "Admin") {
        /* if (req.usuarios.rol === usuarioRol) {
             console.log(usuariosModel.usuario)
             return res.status(500).send({ mensaje: 'Un usuario administrador no se puede editar' });
         }*/
        Usuarios.findByIdAndUpdate(idUsuarios, params, { new: true }, (err, UsuarioActualizado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!UsuarioActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el usuario' });
            return res.status(200).send({ UsuarioActualizado });
        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function eliminarUsuarios(req, res) {
    const idUsuarios = req.params.idUsuarios;
    var usuarioRol = "Admin";
    if (req.admin.rol === "Admin") {
        /*if (req.usuarios.rol === usuarioRol) {
            console.log(usuariosModel.usuario)
            return res.status(500).send({ mensaje: 'Un usuario administrador no se puede eliminar' });
        }*/
        Usuarios.findByIdAndDelete(idUsuarios, (err, UsuarioEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
            return res.status(200).send({ UsuarioEliminado });
        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function registroCliente(req, res) {
    var usuariosModel = new Usuarios();
    var params = req.body;
    var rol = "Cliente";
    if (req.usuarios.rol === "Cliente") {
        if (params.nombre && params.usuario && params.contraseña) {
            usuariosModel.nombre = params.nombre;
            usuariosModel.usuario = params.usuario;
            usuariosModel.contraseña = params.contraseña;
            usuariosModel.rol = rol;
            Usuarios.find({
                $or: [
                    { nombre: usuariosModel.nombre },
                    { usuario: usuariosModel.usuario }
                ]
            }).exec((err, usuariosEncontrados) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion del Usuario' })
                if (usuariosEncontrados && usuariosEncontrados.length >= 1) {
                    return console.log('El usuario ya existe')
                } else {
                    bcrypt.hash(params.contraseña, null, null, (err, contraseñaEncriptada) => {
                        usuariosModel.contraseña = contraseñaEncriptada;
                        usuariosModel.save((err, usuarioGuardado) => {
                            if (err) return console.log('Error al guardar el usuario')
                            if (usuarioGuardado) {
                                return res.status(200).send({ usuarioGuardado })
                            } else {
                                console.log('No se ha podido registrar el usuario')
                            }
                        })
                    })
                }
            })
        }
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function buscarNombreProducto(req, res) {
    var nombreProducto = req.params.nombre;
    if (req.usuarios.rol === "Cliente") {
        Producto.findOne({ nombre: nombreProducto }, (err, productoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error al encontrar al producto' })
            if (!productoEncontrado) return res.status(500).send({ mensaje: 'Error en la peticion' })
            return res.status(200).send({ productoEncontrado })
        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function buscarCategoria(req, res) {
    var idCategoria = req.params.idCategoria;
    Categoria.findOne({ _id: idCategoria }, (err, categoriaEncontrada) => {
        if (err) return res.status(500).send({ mensaje: 'Error en la busqueda de Categoria' })
        if (!categoriaEncontrada) return res.status(500).send({ mensaje: 'Error en la peticion' })
        return res.status(200).send({ categoriaEncontrada })
    })
}

function editarCliente(req, res) {
    var idUsuarios = req.params.idUsuarios;
    var params = req.body
    delete params.contraseña;
    if (req.admin.rol === "Cliente") {

        Usuarios.findByIdAndUpdate(idUsuarios, params, { new: true }, (err, UsuarioActualizado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!UsuarioActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el usuario' });
            return res.status(200).send({ UsuarioActualizado });
        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function eliminarCliente(req, res) {
    const idUsuarios = req.params.idUsuarios;

    if (req.admin.rol === "Cliente") {

        Usuarios.findByIdAndDelete(idUsuarios, (err, UsuarioEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
            return res.status(200).send({ UsuarioEliminado });
        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

module.exports = {
    registroUsuarios,
    loginUsuarios,
    //editarRolUsuarios,
    editarUsuarios,
    eliminarUsuarios,
    registroCliente,
    buscarNombreProducto,
    buscarCategoria,
    editarCliente,
    eliminarCliente
}