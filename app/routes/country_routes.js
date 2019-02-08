const express = require('express')
const passport = require('passport')
const Country = require('../models/country')
const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()

router.get('/countries', requireToken, (req, res) => {
  Country.find()
    .then(countries => {
      return countries.map(country => country.toObject())
    })
    .then(countries => res.status(200).json({ countries: countries }))
    .catch(err => handle(err, res))
})

router.get('/countries/:id', requireToken, (req, res) => {
  Country.findById(req.params.id)
    .then(handle404)
    .then(country => res.status(200).json({ country: country.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/countries', requireToken, (req, res) => {
  req.body.country.owner = req.user.id
  Country.create(req.body.country)
    .then(country => res.status(201).json({ country: country.toObject() }))
    .catch(err => handle(err, res))
})

router.patch('/countries/:id', requireToken, (req, res) => {
  delete req.body.country.owner
  Country.findById(req.params.id)
    .then(handle404)
    .then(country => {
      requireOwnership(req, country)
      Object.keys(req.body.country).forEach(key => {
        if (req.body.country[key] === '') {
          delete req.body.country[key]
        }
      })
      return country.update(req.body.country)
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

router.delete('/countries/:id', requireToken, (req, res) => {
  Country.findById(req.params.id)
    .then(handle404)
    .then(country => {
      requireOwnership(req, country)
      country.remove()
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
