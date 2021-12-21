/* eslint-disable no-undef */
/* eslint-disable prettier/prettier */
// eslint-disable-next-line prettier/prettier
/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
/* eslint-disable new-cap */
const { Router } = require('express');
const { productoModels } = require('../modelos/productoModels');
const { ordenModels } = require('../modelos/ordenModels');
const proRutas = Router();

// Crear Producto
proRutas.post('/crear', function (req, res) {
  const data = req.body;
  const ingresar = new productoModels(data);
  // console.log(ingresar);
  ingresar.save(function (error) {
    if (error) {
      return res.send({
        estado: 'error',
        msg: 'Error: no se pudo crear producto ',
      });
    }
    res.send({ estado: 'ok', msg: 'Producto creado con éxito :)' });
  });
});

// Consultar productos creados
proRutas.get('/consultar', (req, res) => {
  try {
    productoModels.find({}, function (error, productos) {
      if (error) {
        return res
          .status(500)
          .send({ estado: 'Error', msg: 'Listado de productos no encontrado' });
      } else {
        if (productos !== null) {
          return res.status(200).send({
            estado: 'ok',
            msg: 'Listado de productos',
            data: productos,
          });
        }
        return res.status(404).send({
          estado: 'Error',
          msg: 'Listado de materias no se encuentra',
        });
      }
    });
  } catch (error) {}
});

// Crear Orden
proRutas.post('/crearOrden', (req, res) => {
  const data = req.body;
  const ingresar = new ordenModels(data);
  ingresar.save(function (error) {
    if (error) {
      return res.send({
        estado: 'error',
        msg: 'Error: no se pudo crear la orden ',
      });
    }
    res.send({ estado: 'ok', msg: 'Orden creada con éxito :)' });
  });
});

// Consultar ordenes creadas
proRutas.get('/listado', (req, res) => {
  try {
    ordenModels.find({}, function (error, ordenes) {
      // productoModels.populate(ordenes, {path:"productos"}, function (error, ordenes){
      if (error) {
        return res
          .status(500)
          .send({ estado: 'Error', msg: 'Orden no encontrada' });
      } else {
        if (ordenes !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'Listado de Ordenes', data: ordenes });
        }
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'Listado de ordenes no se encuentra' });
      }
      // })
    });
  } catch (error) {}
});

// Para filtrar la id de una orden
proRutas.post('/consultar/listarorden', (req, res) => {
  // no es usado
  try {
    // const {_id}=req.body._id;
    const { _id } = req.body;
    // console.log("aqui comienza");
    console.log(req.body);
    console.log('yo soy', { _id });
    ordenModels.findById(_id, function (error, m) {
      console.log('pasé el filtro', m);
      if (error) {
        return res
          .status(500)
          .send({ estado: 'Error', msg: 'id no encontrado' });
      } else {
        if (m !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'id encontrado', data: m });
        }
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'El id no se encuentra' });
      }
    });
  } catch (error) {}
});

// Editar una orden
proRutas.post('/editar', (req, res) => {
  // nuevo editar
  try {
    const data = req.body;
    const cod = data.cod;
    const nombre = data.nombre;
    const descripcion = data.descripcion;
    const unidad_medida = data.unidad_medida;
    const cantidad_disponible = data.cantidad_disponible;
    const valor_unitario = data.valor_unitario;
    const estado = data.estado;
    materiaModels.updateOne(
      { cod },
      {
        $set: {
          nombre,
          descripcion,
          unidad_medida,
          cantidad_disponible,
          valor_unitario,
          estado,
        },
      },
      function (error, m) {
        if (error) {
          return res
            .status(404)
            .send({ estado: 'Error', msg: 'La orden no fue modificada' });
        } else {
          if (m !== null) {
            return res
              .status(200)
              .send({ estado: 'ok', msg: 'Orden modificada' });
          }
          return res
            .status(200)
            .send({ estado: 'Error', msg: 'la orden no se pudo modificar' });
        }
      }
    );
  } catch (error) {}
});

// Eliminar una orden
proRutas.post('/eliminar', (req, res) => {
  // nuevo eliminar
  try {
    const data = req.body;
    const _id = data._id;
    ordenModels.deleteOne({ _id }, function (error, m) {
      if (error) {
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'La orden no fue eliminada' });
      } else {
        if (m !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'Orden eliminada', data: m });
        }
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'la orden no se pudo eliminar' });
      }
    });
  } catch (error) {}
});

exports.proRutas = proRutas;
