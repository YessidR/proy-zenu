/* eslint-disable prettier/prettier */
/* eslint-disable new-cap */
/* eslint-disable camelcase */
const { Router } = require('express');
const { materiaModels } = require('../modelos/materiaModels');
const inveRutas = Router();

inveRutas.post('/ingresar', (req, res) => {
  const data = req.body;
  const ingresar = new materiaModels(data);
  ingresar.save(function (error) {
    if (error) {
      return res.send({
        estado: 'error',
        msg: 'Error: no se pudo registrar la materia prima',
      });
    }
    res.send({ estado: 'ok', msg: 'Registrado con exito :)' });
  });
});

inveRutas.get('/consultar', (req, res) => {
  try {
    materiaModels.find({}, function (error, materias) {
      if (error) {
        return res
          .status(500)
          .send({ estado: 'Error', msg: 'Listado de  materia no encontrado' });
      } else {
        if (materias !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'Listado de  Ventas', data: materias });
        }
        return res.status(404).send({
          estado: 'Error',
          msg: 'Listado de materias no se encuentra',
        });
      }
    });
  } catch (error) {}
});

inveRutas.post('/consultar/materia', (req, res) => {
  // no es usado
  try {

    const { cod } = req.body;

    materiaModels.findOne({ cod }, function (error, m) {

      if (error) {
        return res
          .status(500)
          .send({ estado: 'Error', msg: 'materia no encontrado' });
      } else {
        if (m !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'materia encontrada', data: m });
        }
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'la materia no se encuentra' });
      }
    });
  } catch (error) {}
});
inveRutas.post('/editar', (req, res) => {
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

    materiaModels.findOneAndDelete({ cod: { $in: cod } }, function (error, m) {
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
});


// filtro para todas las materias despachadas
inveRutas.get('/reportes/despachados', (req, res) => {

  try{
    materiaModels.find({estado:"despachado"}, function (error, m) {

      if (error) {
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'Error' });
      } else {
        if (m !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'ok',data:m });
        }
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'Error ' });
      }
      });
   } catch(error){}
  }
  );

// filtro para todas las materias sin despachar
inveRutas.get('/reportes/sindespachar', (req, res) => {
  try{
    materiaModels.find({estado:"sindespachar"}, function (error, m) {

      if (error) {
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'Error' });
      } else {
        if (m !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'ok',data:m });
        }
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'Error' });
      }
      });
   } catch(error){}
  }
  );

// filtro para todas las materias sin despachar
inveRutas.get('/reportes/masvendida', (req, res) => {
  try{
    materiaModels.find({}).sort({"cantidad_disponible": 1})
    .limit(1).exec(function (error, m) {

      if (error) {
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'Error' });
      } else {
        if (m !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'ok',data:m, vendida:m[0].nombre});
        }
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'Error' });
      }
      });
   } catch(error){}
  }
  );

exports.inveRutas = inveRutas;