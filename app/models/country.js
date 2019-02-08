const mongoose = require('mongoose')

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  continent: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Country', countrySchema)
