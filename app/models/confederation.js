const mongoose = require('mongoose')

const confederationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Confederation', confederationSchema)
