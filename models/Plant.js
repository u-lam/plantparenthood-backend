const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  name: String,
  sunlight: String,
  water: String,
  pic: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Plant', PlantSchema);