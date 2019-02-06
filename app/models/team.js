const mongoose = require('mongoose')

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  nickname: {
    type: String,
    required: true
  },
  stadium: {
    type: String,
    required: true
  },
  league: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Team', teamSchema)
