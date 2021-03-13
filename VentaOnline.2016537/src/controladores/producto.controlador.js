'use strict'

const Producto = require('../modelos/producto.model')


function registrarProducto(req, res) {
    var productoModel = new Producto();
    var params = req.body;
    if (req.admin.rol === "Admin") {
        if (params.nombre && params.precio && params.stock && params.ventas && params.idCategoria) {
            productoModel.nombre = params.nombre;
            productoModel.precio = params.precio;
            productoModel.stock = params.stock;
            productoModel.ventas = params.ventas;
            productoModel.idCategoria = params.idCategoria;
            Producto.find({
                $or: [
                    { nombre: productoModel.nombre }
                ]
            }).exec((err, productoEncontrado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                if (productoEncontrado && productoEncontrado.length >= 1) {
                    return res.status(500).send({ mensaje: 'El producto ya existe' })
                } else {
                    productoModel.save((err, productoGuardado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error al guardar el Producto' })
                        if (productoGuardado) {
                            res.status(200).send(productoGuardado)
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido registrar el producto' })
                        }
                    })
                }
            })
        }
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function buscarProductos(req, res) {
    if (req.admin.rol === "Admin") {
        Producto.find((err, productosEncontrados) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener Productos' })
            if (!productosEncontrados) return res.status(500).send({ mensaje: 'Error en la consulta de Productos' })
            return res.status(200).send({ productosEncontrados })

        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function buscarIdP(req, res) {
    if (req.admin.rol === "Admin") {
        var idProducto = req.params.idProducto

        Producto.findById(idProducto, (err, productoEncontrado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en  la peticion del Producto' })
            if (!productoEncontrado) return res.status(500).send({ mensaje: 'Error en obtener los datos del Producto' })
            console.log(productoEncontrado.nombre);
            return res.status(200).send({ productoEncontrado })
        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function editarProducto(req, res) {
    var idProducto = req.params.idProducto;
    var params = req.body
    if (req.admin.rol === "Admin") {
        Producto.findByIdAndUpdate(idProducto, params, { new: true }, (err, productoActualizado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!productoActualizado) return res.status(500).send({ mensaje: 'No se ha podido actualizar el Producto' });
            return res.status(200).send({ productoActualizado });
        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function eliminarProducto(req, res) {
    const idProducto = req.params.idProducto;
    if (req.admin.rol === "Admin") {
        Producto.findByIdAndDelete(idProducto, (err, productoEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
            return res.status(200).send({ productoEliminado });
        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function controlStock(req, res) {
    var idProducto = req.params.idProducto;
    Producto.findById(idProducto, (err, productoEncontrado) => {
        if (productoEncontrado.stock != 0) {
            return res.status(200).send({ mensaje: 'Producto disponible', productoEncontrado })
        } else {
            return res.status(500).send({ mensaje: 'Producto agotado', productoEncontrado })
        }
    })
}



module.exports = {
    registrarProducto,
    buscarProductos,
    buscarIdP,
    editarProducto,
    eliminarProducto,
    controlStock,

}