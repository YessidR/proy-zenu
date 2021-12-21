/* eslint-disable prettier/prettier */
/* eslint-disable new-cap */
const { Router } = require('express');
const { registerModel } = require('../modelos/registerModel');
const dasRutas = Router();

dasRutas.post('/registrar', (req, res) => {
  const data = req.body;
  const register = new registerModel(data);
  register.save(function (error) {
    if (error) {
      return res.send({
        estado: 'error',
        msg: 'Error: no se pudo registrar el usuario',
      });
    }
    res.send({ estado: 'ok', msg: 'Registrado con exito :)' });
  });
});

// Cosnsultar lista usuarios
dasRutas.get('/usuarios', (req, res) => {
  try {
    registerModel.find({}, function (error, usuarios) {
      if (error) {
        return res
          .status(500)
          .send({ estado: 'Error', msg: 'Usuario no encontrado' });
      } else {
        if (usuarios !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'Listado de Usuarios', data: usuarios });
        }
        return res.status(404).send({
          estado: 'Error',
          msg: 'El usuario no se encuentra',
        });
      }
    });
  } catch (error) {}
});

// editar usuario registrado
dasRutas.post('/consultar/usuarios', (req, res) => {
  try {

    const { user } = req.body;

    registerModel.findOne({ user }, function (error, m) {

      if (error) {
        return res
          .status(500)
          .send({ estado: 'Error', msg: 'Usuario no encontrado' });
      } else {
        if (m !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'usuario encontrado', data: m });
        }
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'El usuario no se encuentra' });
      }
    });
  } catch (error) {}
});

dasRutas.post('/editarUsuarios', (req, res) => {
  // nuevo editar
  try {
    
    const data = req.body;
    const nombre = data.nombre;
    const user = data.user;
    const password = data.password;
    const email = data.email;
    const cargo = data.cargo;
    

    // const estado = data.estado;
    registerModel.updateOne(
      { user },
      {
        $set: {
          nombre,
          user,
          password,
          email,
          cargo
        },
      },
      function (error, m) {
        if (error) {
          return res
            .status(404)
            .send({ estado: 'Error', msg: 'Usuario no fue modificado' });
        } else {
          if (m !== null) {
            return res
              .status(200)
              .send({ estado: 'ok', msg: 'Usuario Modificado' });
          }
          return res
            .status(200)
            .send({ estado: 'Error', msg: 'El usuario no se pudo modificar' });
        }
      }
    );
  } catch (error) {}
});

dasRutas.post('/eliminar', (req, res) => {
  // nuevo eliminar
  try {
    const data = req.body;
    const user = data.user;
    registerModel.deleteOne({user}, function (error, m) {
      if (error) {
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'Usuario no fue eliminado' });
      } else {
        if (m !== null) {
          return res
            .status(200)
            .send({ estado: 'ok', msg: 'Usuario eliminado' });
        }
        return res
          .status(404)
          .send({ estado: 'Error', msg: 'El usuario no se pudo eliminar' });
      }
    });
  } catch (error) {}
});


exports.dasRutas = dasRutas;
