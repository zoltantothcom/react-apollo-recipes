const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  desciption: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
  username: {
    type: String,
  },
});

module.exports = mongoose.model('Recipe', RecipeSchema);