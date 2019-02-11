const express = require('express')
const passport = require('passport')
const Confederation = require('../models/confederation')
const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/confederations', requireToken, (req, res) => {
  Confederation.find()
    .then(confederations => {
      return confederations.map(confederation => confederation.toObject())
    })
    .then(confederations => res.status(200).json({ confederations: confederations }))
    .catch(err => handle(err, res))
})

router.get('/confederations/:id', requireToken, (req, res) => {
  Confederation.findById(req.params.id)
    .then(handle404)
    .then(confederation => res.status(200).json({ confederation: confederation.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/confederations', requireToken, (req, res) => {
  req.body.confederation.owner = req.user.id
  Confederation.create(req.body.confederation)
    .then(confederation => res.status(201).json({ confederation: confederation.toObject() }))
    .catch(err => handle(err, res))
})

router.patch('/confederations/:id', requireToken, (req, res) => {
  delete req.body.confederation.owner
  Confederation.findById(req.params.id)
    .then(handle404)
    .then(confederation => {
      requireOwnership(req, confederation)
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

router.delete('/confederations/:id', requireToken, (req, res) => {
  Confederation.findById(req.params.id)
    .then(handle404)
    .then(confederation => {
      requireOwnership(req, confederation)
      confederation.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
