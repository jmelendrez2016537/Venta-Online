'use strict'

const Factura = require('../modelos/factura.modelo')

function registrarFactura(req, res) {
    var facturaModel = new Factura();
    var params = req.body;
    if (req.admin.rol === "Admin") {
        if (params.idUsuario && params.idProducto && params.compra && params.total) {
            facturaModel.idUsuario = params.idUsuario;
            facturaModel.idProducto = params.idProducto;
            facturaModel.compra = params.compra;
            facturaModel.total = params.total;
            if (req.usuario.sub != facturaModel.idUsuario) {
                console.log(req.usuario.sub, facturaModel.idUsuario)
                return res.status(500).send({ mensaje: 'No puede ingresar este Usuario' });
            }
            if (req.producto.sub != facturaModel.idProducto) {
                console.log(req.producto.sub, facturaModel.idProducto)
                return res.status(500).send({ mensaje: 'No puede ingresar este Producto' });
            }
            Factura.find({

            }).exec((err, facturaEncontrado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })

                facturaModel.save((err, facturaGuardada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error al guardar la factura' })
                    if (facturaGuardada) {
                        res.status(200).send(facturaGuardada)
                    } else {
                        res.status(404).send({ mensaje: 'No se ha podido registrar la Factura' })
                    }
                })

            })
        }
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}