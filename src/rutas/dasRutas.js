/* eslint-disable prettier/prettier */
/* eslint-disable new-cap */
const { Router } = require('express');
const dasRutas = Router();

const { registerModel } = require('../modelos/registerModel');

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

exports.dasRutas = dasRutas;
