const express = require('express')
const League = require('../models/league')
const handle = require('../../lib/error_handler')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const router = express.Router()

router.get('/leagues', (req, res) => {
  League.find()
    .then(leagues => {
      return leagues.map(league => league.toObject())
    })
    .then(leagues => res.status(200).json({ leagues: leagues }))
    .catch(err => handle(err, res))
})

router.get('/leagues/:id', (req, res) => {
  League.findById(req.params.id)
    .then(handle404)
    .then(league => res.status(200).json({ league: league.toObject() }))
    .catch(err => handle(err, res))
})

router.post('/leagues', (req, res) => {
  League.create(req.body.league)
    .then(league => res.status(201).json({ league: league.toObject() }))
    .catch(err => handle(err, res))
})

router.patch('/leagues/:id', (req, res) => {
  League.findById(req.params.id)
    .then(handle404)
    .then(league => {
      Object.keys(req.body.league).forEach(key => {
        if (req.body.league[key] === '') {
          delete req.body.league[key]
        }
      })
      return league.update(req.body.league)
    })
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

router.delete('/leagues/:id', (req, res) => {
  League.findById(req.params.id)
    .then(handle404)
    .then(league => league.remove())
    .then(() => res.sendStatus(204))
    .catch(err => handle(err, res))
})

module.exports = router
