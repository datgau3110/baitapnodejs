const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { boolean, number, string } = require('joi');

const professionalSchema = mongoose.Schema(
  {
    
    Degree: {
      type: String,
      required: true,
      trim: true,
    },
    Experience: {
      type: String,
      required: true,
      trim: true,
    },
    
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
professionalSchema.plugin(toJSON);
professionalSchema.plugin(paginate);

/**
 * @typedef Professional
 */
const Professional = mongoose.model('Professional', professionalSchema);

module.exports = Professional;
