/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const { genSalt, hash } = require('bcrypt');

const registerSchema = new Schema({
  nombre: {
    type: 'string',
    required: true,
  },
  user: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
  },
  cargo: {
    type: 'string',
    required: true,
  },
});
registerSchema.pre('save', async function (next) {
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});
const registerModel = model('usuarios', registerSchema);
exports.registerModel = registerModel;
