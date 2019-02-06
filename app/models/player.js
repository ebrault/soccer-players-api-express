const mongoose = require('mongoose')

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Player', playerSchema)
