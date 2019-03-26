const mongoose = require("mongoose");
const { genreSchema } = require("./genre");
const Joi = require("joi");

function validateMovie(movie) {
  return Joi.validate(movie, {
    title: Joi.string()
      .required()
      .min(1),
    genre: Joi.required().string(),
    numberInStock: Joi.number()
      .min(0)
      .max(100),
    dailyRentalRate: Joi.number()
      .min(1)
      .max(50)
  });
}

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      min: 1,
      match: new RegExp("^[a-zA-Z0-9-][a-zA-Z0-9- ]*")
    },
    genre: {
      type: genreSchema,
      required: true
    },
    numberInStock: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    dailyRentalRate: {
      type: Number,
      default: 1.0,
      min: 1,
      max: 50
    }
  })
);

exports.Movie = Movie;
exports.validateMovie = validateMovie;
