const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { dasRutas } = require('./rutas/dasRutas');
const { registerModel } = require('./modelos/registerModel');
const { sign } = require('jsonwebtoken');
const { compare } = require('bcrypt');
// const { usuarioRutas } = require("./rutas/usuarioRutas");

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
      // const token = sign(
      //     {
      //         _id: user.id,
      //         usuario: user.usuario,
      //         rol: user.rol,
      //     },
      //     process.env.JWT_SECRET_KEY
      // )
      const cargo = userl.cargo;
      if (cargo === 'administrador') {
        return res.status(200).send({
          estado: 'ok',
          msg: 'Logueado',
          data: userl,
        });
      } else if (cargo === 'produccion') {
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
// app.use("/inventario",inveRutas);
// app.use("/produccion", proRutas);

mongoose
  .connect('mongodb://127.0.0.1:27017/zenu')
  .then((res) => console.log('Conectado a BD'))
  .catch((error) => console.log(error));

app.listen(8082, () => {
  console.log('Servidor corriendo en el puerto 8082');
});
