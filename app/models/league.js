const mongoose = require('mongoose')

const leagueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
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

module.exports = mongoose.model('League', leagueSchema)
