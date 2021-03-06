/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { dasRutas } = require('./rutas/dasRutas');
const { inveRutas } = require('./rutas/inveRutas');
const { proRutas } = require('./rutas/proRutas')
const { registerModel } = require('./modelos/registerModel');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcrypt');

const app = express();
app.use(cors()); // Middleware cors
app.use(express.json()); // Middleware convierte a json
require('dotenv').config();

app.post('/', async function (req, res) {
  try {
    const { user, password } = req.body;

    const userl = await registerModel.findOne({ user });

    const passok = await compare(password, userl.password);

    if (passok) {
      const cargo = userl.cargo;
      if (cargo == 'administrador') {
        return res.status(200).send({
          estado: 'ok',
          msg: 'Logueado',
          data: userl,
        });
      } else if (cargo == 'produccion') {
        return res.status(200).send({
          estado: 'ok',
          msg: 'Logueado',
          data: userl,
        });
      } else {
        return res.status(200).send({
          estado: 'ok',
          msg: 'Logueado',
          data: userl,
        });
      }
    }
    return res.status(401).send({
      estado: 'error',
      msg: 'credenciales no valida',
    });
  } catch (error) {}
});

app.use('/dashboard', dasRutas);
app.use('/inventario', inveRutas);
app.use("/produccion", proRutas);

mongoose
  .connect(
    'mongodb+srv://carlosO:gF0unsXdDHeF1ZZY@zenu.zt7qx.mongodb.net/zenu?retryWrites=true&w=majority'
  )
  .then((res) => console.log('Conectado a BD'))
  .catch((error) => console.log(error));

app.listen(8081, () => {
  console.log('Servidor corriendo en el puerto 8081');
});


