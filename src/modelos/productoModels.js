/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productoSchema = new Schema({
  nombre: {
    type: 'string',
    required: true,
  },
  mat1: {
    type: 'string',
    required: true,
  },
  cant1: {
    type: 'number',
    required: true,
  },
  mat2: {
    type: 'string',
    required: true,
  },
  cant2: {
    type: 'number',
    required: true,
  },
  mat3: {
    type: 'string',
    required: false,
  },
  cant3: {
    type: 'number',
    required: false,
  },
  mat4: {
    type: 'string',
    required: false,
  },
  cant4: {
    type: 'number',
    required: false,
  },
  mat5: {
    type: 'string',
    required: false,
  },
  cant5: {
    type: 'number',
    required: false,
  },
});

const productoModels = model('materias', productoSchema);
exports.productoModels = productoModels;
