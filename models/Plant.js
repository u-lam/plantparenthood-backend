const mongoose = require('mongoose');

const PlantSchema = new mongoose.Schema({
  name: String,
  sunlightReq: String,
  waterReq: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

module.exports = mongoose.model('Plant', PlantSchema);