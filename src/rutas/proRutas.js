/* eslint-disable prettier/prettier */
/* eslint-disable spaced-comment */
/* eslint-disable camelcase */
/* eslint-disable new-cap */
const { Router } = require('express');
const { productoModels } = require('../modelos/productoModels');
const proRutas = Router();

// Crear Producto
proRutas.post('/crear', function(req, res){
  const data = req.body;
  const ingresar = new productoModels(data);
  console.log(ingresar);
  ingresar.save(function (error) {
  console.log(data);
  console.log(error);    
    if (error) {
      return res.send({
        estado: 'error',
        msg: 'Error: no se pudo crear producto ',
      });
    }
    res.send({ estado: 'ok', msg: 'Producto creado con éxito :)' });
  });
});

// Crear Orden
proRutas.post('/crearOrden', (req, res) => {
    const data = req.body;
    const ingresar = new productoModels(data);
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

// Ver Ordenes
proRutas.get('/verOrden', (req, res) => {
  try {
    productoModels.find({}, function (error, productos) {
      if (error) {
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'Orden no encontrada ' });
      } else {
        if (productos !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'Listado de Ordenes', data: productos });
        }
        return res.status(200).send({
          estado: 'Error',
          msg: 'Listado de ordenes no se encuentra ',
        });
      }
    });
  } catch (error) {}
});


/*inveRutas.post('/editar', (req, res) => {
  // nuevo editar
  try {
    const data = req.body;
    const cod = data.cod;
    const nombre = data.nombre;
    const descripcion = data.descripcion;
    const unidad_medida = data.unidad_medida;
    const cantidad_disponible = data.cantidad_disponible;
    const valor_unitario = data.valor_unitario;
    materiaModels.updateOne(
      { cod },
      {
        $set: {
          nombre,
          descripcion,
          unidad_medida,
          cantidad_disponible,
          valor_unitario,
        },
      },
      function (error, m) {
        if (error) {
          return res
            .status(404)
            .send({ estado: 'Error', msg: 'materia no fue modificada' });
        } else {
          if (m !== null) {
            return res
              .status(200)
              .send({ estado: 'ok', msg: 'materia modificada' });
          }
          return res
            .status(200)
            .send({ estado: 'Error', msg: 'la materia no se pudo modificar' });
        }
      }
    );
  } catch (error) {}
});

inveRutas.post('/eliminar', (req, res) => {
  // nuevo eliminar
  try {
    const data = req.body;
    const cod = data.cod;
    materiaModels.deleteOne({ cod }, function (error, m) {
      if (error) {
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'materia no fue eliminada' });
      } else {
        if (m !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'materia eliminada' });
        }
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'la materia no se pudo eliminar' });
      }
    });
  } catch (error) {}
});*/

exports.proRutas = proRutas;