/* eslint-disable prettier/prettier */
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ordenSchema = new Schema({
  producto: {
    type: Schema.ObjectId,
    ref: "productos",
    required: true,
  },

  nombre: {
    type: 'string',
    required: true,
  },

  cantidad: {
    type: 'number',
    required: true,
  },

  estado: {
    type: 'string',
    required: true,
  }
});

const ordenModels = model('ordenes', ordenSchema);
exports.ordenModels = ordenModels;