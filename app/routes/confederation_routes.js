const express = require('express')
const Confederation = require('../models/confederation')
const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const router = express.Router()

router.get('/confederations', (req, res) => {
  Confederation.find()
    .then(confederations => {
      return confederations.map(confederation => confederation.toObject())
    })
    .then(confederations => res.status(200).json({ confederations: confederations }))
    .catch(err => handle(err, res))
})

router.get('/confederations/:id', (req, res) => {
  Confederation.findById(req.params.id)
    .then(handle404)
    .then(confederation => res.status(200).json({ confederation: confederation.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/confederations', (req, res) => {
  Confederation.create(req.body.confederation)
    .then(confederation => res.status(201).json({ confederation: confederation.toObject() }))
    .catch(err => handle(err, res))
})

router.patch('/confederations/:id', (req, res) => {
  Confederation.findById(req.params.id)
    .then(handle404)
    .then(confederation => {
      Object.keys(req.body.confederation).forEach(key => {
        if (req.body.confederation[key] === '') {
          delete req.body.confederation[key]
        }
      })
      return confederation.update(req.body.confederation)
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

router.delete('/confederations/:id', (req, res) => {
  Confederation.findById(req.params.id)
    .then(handle404)
    .then(confederation => confederation.remove())
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
