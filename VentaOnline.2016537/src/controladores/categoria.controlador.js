'use strict'

const Categoria = require('../modelos/categoria.modelo')

function registrarCategoria(req, res) {
    var categoriaModel = new Categoria();
    var params = req.body;
    if (req.admin.rol === "Admin") {
        if (params.nombre && params.descripcion) {
            categoriaModel.nombre = params.nombre;
            categoriaModel.descripcion = params.descripcion;
            Categoria.find({
                $or: [
                    { nombre: categoriaModel.nombre }
                ]
            }).exec((err, categoriaEncontrada) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                if (categoriaEncontrada && categoriaEncontrada.length >= 1) {
                    return res.status(500).send({ mensaje: 'La categoria ya existe' })
                } else {
                    categoriaModel.save((err, categoriaGuardada) => {
                        if (err) return res.status(500).send({ mensaje: 'Error al guardar la Categoria' })
                        if (categoriaGuardada) {
                            res.status(200).send(categoriaGuardada)
                        } else {
                            res.status(404).send({ mensaje: 'No se ha podido registrar la Categoria' })
                        }
                    })
                }
            })
        }
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function buscarCategorias(req, res) {
    if (req.admin.rol === "Admin") {
        Categoria.find((err, categoriasEncontradas) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion de obtener las Categorias' })
            if (!categoriasEncontradas) return res.status(500).send({ mensaje: 'Error en la consulta de Categorias' })
            return res.status(200).send({ categoriasEncontradas })

        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function editarCategoria(req, res) {
    var idCategoria = req.params.idCategoria;
    var params = req.body
    if (req.admin.rol === "Admin") {
        Categoria.findByIdAndUpdate(idCategoria, params, { new: true }, (err, categoriaActualizada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!categoriaActualizada) return res.status(500).send({ mensaje: 'No se ha podido actualizar la Categoria' });
            return res.status(200).send({ categoriaActualizada });
        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

function eliminarCategoria(req, res) {
    const idCategoria = req.params.idCategoria;
    if (req.admin.rol === "Admin") {
        Categoria.findByIdAndDelete(idCategoria, (err, categoriaEliminada) => {
            if (err) return res.status(500).send({ mensaje: 'error en la peticion' })
            return res.status(200).send({ categoriaEliminada });
        })
    } else {
        return res.status(500).send({ mensaje: 'Su rol no tiene los permisos' })
    }
}

module.exports = {
    registrarCategoria,
    buscarCategorias,
    editarCategoria,
    eliminarCategoria
}