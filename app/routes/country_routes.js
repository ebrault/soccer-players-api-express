const express = require('express')
const Country = require('../models/country')
const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const router = express.Router()

router.get('/countries', (req, res) => {
  Country.find()
    .then(countries => {
      return countries.map(country => country.toObject())
    })
    .then(countries => res.status(200).json({ countries: countries }))
    .catch(err => handle(err, res))
})

router.get('/countries/:id', (req, res) => {
  Country.findById(req.params.id)
    .then(handle404)
    .then(country => res.status(200).json({ country: country.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/countries', (req, res) => {
  Country.create(req.body.country)
    .then(country => res.status(201).json({ country: country.toObject() }))
    .catch(err => handle(err, res))
})

router.patch('/countries/:id', (req, res) => {
  Country.findById(req.params.id)
    .then(handle404)
    .then(country => {
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

router.delete('/countries/:id', (req, res) => {
  Country.findById(req.params.id)
    .then(handle404)
    .then(country => country.remove())
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
