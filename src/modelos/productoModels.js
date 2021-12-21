/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productoSchema = new Schema({
  nombre: {
    type: 'string',
    required: true,
  },

  materia1: {
    type: Schema.ObjectId,
    ref: "materias",
    required: true,
  },

  cant1: {
    type: 'number',
    required: true,
  },

  materia2: {
    type: Schema.ObjectId,
    ref: "materias",
    required: true,
  },

  cant2: {
    type: 'number',
    required: true,
  },

  materia3: {
    type: Schema.ObjectId,
    ref: "materias",
    required: false,
  },

  cant3: {
    type: 'number',
    required: false,
  },

  materia4: {
    type: Schema.ObjectId,
    ref: "materias",
    required: false,
  },

  cant4: {
    type: 'number',
    required: false,
  }, 

  materia5: {
    type: Schema.ObjectId,
    ref: "materias",
    required: false,
  },

  cant5: {
    type: 'number',
    required: false,
  },
});

const productoModels = model('productos', productoSchema);
exports.productoModels = productoModels;