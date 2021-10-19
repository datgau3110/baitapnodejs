const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');
const { roles } = require('../config/roles');
const { boolean, number, string } = require('joi');

const peopleSchema = mongoose.Schema(
  {
    
    PID: {
      type: String,
      required: true,
      trim: true,
    },
    Pname: {
      type: String,
      required: true,
      trim: true,
    },
    Sex: {
      type: Boolean,
      required: true,
      trim: true,
    },
    DayOfBirth: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
      trim: true,
    },
    Address: {
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
peopleSchema.plugin(toJSON);
peopleSchema.plugin(paginate);

/**
 * Check if email is taken
 * @param {string} email - The people's email
 * @param {ObjectId} [excludePeopleId] - The id of the people to be excluded
 * @returns {Promise<boolean>}
 */
peopleSchema.statics.isEmailTaken = async function (email, excludePeopleId) {
  const people = await this.findOne({ email, _id: { $ne: excludePeopleId } });
  return !!people;
};

/**
 * Check if password matches the people's password
 * @param {string} password
 * @returns {Promise<boolean>}
 */
peopleSchema.methods.isPasswordMatch = async function (password) {
  const people = this;
  return bcrypt.compare(password, people.password);
};

peopleSchema.pre('save', async function (next) {
  const people = this;
  if (people.isModified('password')) {
    people.password = await bcrypt.hash(people.password, 8);
  }
  next();
});

/**
 * @typedef People
 */
const People = mongoose.model('People', peopleSchema);

module.exports = People;
