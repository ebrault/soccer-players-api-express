const mongoose = require('mongoose')

const nationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  continent: {
    type: String,
    required: true
  },
  administrator: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    requried: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Nation', nationSchema)
